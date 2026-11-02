import { ActionError } from "../src/ActionError";
import { Action } from "../src/game/actions/Action";
import { ActionSpawn } from "../src/game/actions/ActionSpawn";
import { Ability } from "../src/game/elements/Ability";
import { BoardSquare } from "../src/game/elements/BoardSquare";
import { GameF26 } from "../src/game/elements/GameF26";
import { Piece } from "../src/game/elements/Piece";
import { PieceMinion } from "../src/game/elements/PieceMinion";
import { ActionType, BoardLocation } from "../src/game/elements/Utilities";
import { TestGame } from "./TestGame";

describe("Action Spawn", () => {
    let testGame: TestGame = new TestGame();
    const endSquare: BoardLocation = new BoardLocation(-1, -1);
    console.log("At Start: \n" + testGame.game.getGameBoard().toString());
    console.log(testGame.teamA.toString());
    console.log(testGame.teamB.toString());

    // only a start location required so we're passing an invalid end location
    const spawnMinion: ActionSpawn = new ActionSpawn(
        testGame.game,
        new BoardLocation(0, 0),
        endSquare,
    );

    test("(1 pts)  ActionSpawn - hierarchy", () => {
        expect(spawnMinion).toBeInstanceOf(Action);
    });

    test("(2 pts)  ActionSpawn -  testing valid action for Start Location Requirement", () => {
        // try an invalid spawn - start square
        // out of bounds  [0][10]
        let spawnMinionInvalid: ActionSpawn = new ActionSpawn(
            testGame.game,
            new BoardLocation(0, 10),
            endSquare,
        );
        expect(spawnMinionInvalid.validAction()).toEqual(false);
        // out of bounds  [-3][0]
        spawnMinionInvalid = new ActionSpawn(
            testGame.game,
            new BoardLocation(-3, 0),
            endSquare,
        );
        expect(spawnMinionInvalid.validAction()).toEqual(false);

        // try invalid - no piece on the start square [2][3]
        spawnMinionInvalid = new ActionSpawn(
            testGame.game,
            new BoardLocation(2, 3),
            endSquare,
        );
        expect(spawnMinionInvalid.validAction()).toEqual(false);

        // try start square with opponents piece [3][3]
        spawnMinionInvalid = new ActionSpawn(
            testGame.game,
            new BoardLocation(3, 3),
            endSquare,
        );
        expect(spawnMinionInvalid.validAction()).toEqual(false);

        // try start square that can't take that action
        // Red H doesn't have a spawn in backpack
        spawnMinionInvalid = new ActionSpawn(
            testGame.game,
            new BoardLocation(0, 0),
            endSquare,
        );
        expect(spawnMinionInvalid.validAction()).toEqual(false);

        //TODO full board
    });

    test("(2 pts)  ActionSpawn - performAction when valid", () => {
        // aMinion on [2] [2] has spawn in backpack
        let spawnMinionValid: ActionSpawn = new ActionSpawn(
            testGame.game,
            new BoardLocation(2, 2),
            endSquare,
        );
        expect(spawnMinionValid.validAction()).toEqual(true);

        try {
            spawnMinionValid.performAction();
            console.log(
                "After Spawn of Piece on [2][2]: \n" +
                    testGame.game.getGameBoard().toString(),
            );
            console.log(testGame.teamA.toString());
            console.log(testGame.teamB.toString());
            // new Minion should be on board and belong to a Team
            // minion of [2][2] should still be there but shouldn't
            // have a spawn available anymore
            expect(
                testGame.game
                    .getGameBoard()
                    .getSquare(new BoardLocation(2, 2))
                    .isEmpty(),
            ).toEqual(false);
            expect(
                testGame.game
                    .getGameBoard()
                    .getSquare(new BoardLocation(2, 2))
                    .getPiece(),
            ).toBe(testGame.aMinion);
            // used up the spawn ability
            expect(
                testGame.aMinion.getBackpack().isAvailable(ActionType.Spawn),
            ).toEqual(false);

            // Team A should have another minion
            expect(testGame.teamA.getPieces().length).toEqual(3);

            // new minion should be added to teamA
            let spawnedPiece: Piece | null = null;
            for (let piece of testGame.teamA.getPieces()) {
                if (
                    piece instanceof PieceMinion &&
                    piece !== testGame.aMinion
                ) {
                    spawnedPiece = piece;
                }
            }
            expect(spawnedPiece).not.toBeNull();

            // new minion should be somewhere on the board
            // find its location
            let squares: BoardSquare[][] = testGame.game
                .getGameBoard()
                .getAllSquares();
            let spawnLocation: BoardLocation | null = null;
            for (let row = 0; row < squares.length; row++) {
                for (let col = 0; col < squares[row].length; col++) {
                    if (squares[row][col].getPiece() === spawnedPiece) {
                        spawnLocation = new BoardLocation(row, col);
                    }
                }
            }
            expect(spawnLocation).not.toBeNull();
            // turn shoud be changed
            expect(testGame.game.isTurn(testGame.teamB)).toEqual(true);
        } catch (e) {
            console.log(e);
            console.log(testGame.game.getMessage());
        }
    });

    test("(2 pts)  ActionSpawn - invalid due to full board", () => {
        let miniGame: GameF26 = new GameF26(2, 2, "Red", "Blue", 3);
        // iterate over the board and give them all the ability to spawn
        //find location of a red piece
        let squares: BoardSquare[][] = miniGame.getGameBoard().getAllSquares();
        let redPieceLocation: BoardLocation = new BoardLocation(0, 0);
        for (let row = 0; row < squares.length; row++) {
            for (let col = 0; col < squares[row].length; col++) {
                squares[row][col]
                    .getPiece()
                    ?.getBackpack()
                    .setAbilities([new Ability(ActionType.Spawn, false)]);
                if (squares[row][col].getPiece()?.getTeamColor() === "Red") {
                    redPieceLocation = new BoardLocation(row, col);
                }
            }
        }

        console.log(
            "Full Board : All Pieces have a spawn \n" +
                miniGame.getGameBoard().toString(),
        );

        console.log(miniGame.toString());

        let spawnInValid: ActionSpawn = new ActionSpawn(
            testGame.game,
            redPieceLocation,
            endSquare,
        );
        expect(spawnInValid.isValidAction()).toEqual(false);
    });

    test("(2 pts)  ActionSpawn - performAction when invalid", () => {
        let spawnInValid: ActionSpawn = new ActionSpawn(
            testGame.game,
            new BoardLocation(0, 0),
            endSquare,
        );
        // not in this piece's backpack
        let errOccurred: boolean = false;
        try {
            spawnInValid.performAction();
        } catch (e) {
            errOccurred = true;
            expect(e).toBeInstanceOf(ActionError);
            let err: ActionError = <ActionError>e;
            expect(err.actionType).toEqual(ActionType.Spawn);
        } finally {
            expect(errOccurred).toEqual(true);
        }
    });
});
