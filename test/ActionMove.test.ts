import { ActionError } from "../src/ActionError";
import { Action } from "../src/game/actions/Action";
import { ActionMove } from "../src/game/actions/ActionMove";
import { ActionType, BoardLocation } from "../src/game/elements/Utilities";
import { TestGame } from "./TestGame";

describe("Action Move", () => {
    let testGame: TestGame = new TestGame();
    console.log("At Start: \n" + testGame.game.getGameBoard().toString());
    let moveHen: ActionMove = new ActionMove(
        testGame.game,
        new BoardLocation(0, 0),
        new BoardLocation(1, 0),
    );

    test("(1 pts)  ActionMove - hierarchy", () => {
        expect(moveHen).toBeInstanceOf(Action);
    });

    test("(3 pts)  ActionMove - testing valid action for Start Location Requirements ", () => {
        // try an invalid move - start square
        // out of bounds  [9][-1]
        let moveHenInvalid: ActionMove = new ActionMove(
            testGame.game,
            new BoardLocation(9, -1),
            new BoardLocation(1, 1),
        );
        expect(moveHenInvalid.isValidAction()).toEqual(false);

        // try invalid - no piece on the start square [0][3]
        moveHenInvalid = new ActionMove(
            testGame.game,
            new BoardLocation(0, 3),
            new BoardLocation(0, 2),
        );
        expect(moveHenInvalid.isValidAction()).toEqual(false);

        // try start square with opponents piece [1][1]
        moveHenInvalid = new ActionMove(
            testGame.game,
            new BoardLocation(1, 1),
            new BoardLocation(0, 2),
        );
        expect(moveHenInvalid.isValidAction()).toEqual(false);
    });

    test("(3 pts)  ActionMove - testing valid action for End Location Requirements ", () => {
        // try an invalid move - the end square
        // out of bounds [8][8]
        let moveHenTester: ActionMove = new ActionMove(
            testGame.game,
            new BoardLocation(0, 0),
            new BoardLocation(8, 8),
        );
        expect(moveHenTester.isValidAction()).toEqual(false);

        // try an invalid move - piece on the end square
        // move red hen [0][0] to  [1][1] - piece on this end space
        moveHenTester = new ActionMove(
            testGame.game,
            new BoardLocation(0, 0),
            new BoardLocation(1, 1),
        );
        expect(moveHenTester.isValidAction()).toEqual(false);

        // try a valid move
        moveHenTester = new ActionMove(
            testGame.game,
            new BoardLocation(0, 0),
            new BoardLocation(1, 0),
        );
        expect(moveHenTester.isValidAction()).toEqual(true);
    });

    test("(2 pts)  ActionMove - validAction, performAction", () => {
        let moveHenValid: ActionMove = new ActionMove(
            testGame.game,
            new BoardLocation(0, 0),
            new BoardLocation(0, 5),
        );
        // move red hen [0][0] to [0][5] is valid
        expect(moveHenValid.isValidAction()).toEqual(true);
        try {
            moveHenValid.performAction();
            console.log(
                "After Move piece on [0][0] to [0][5]: \n" +
                    testGame.game.getGameBoard().toString(),
            );
            // hen should be off [0][0] and on [0][5]
            expect(
                testGame.game
                    .getGameBoard()
                    .getSquare(new BoardLocation(0, 0))
                    .isEmpty(),
            ).toEqual(true);
            expect(
                testGame.game
                    .getGameBoard()
                    .getSquare(new BoardLocation(0, 5))
                    .isEmpty(),
            ).toEqual(false);
            expect(
                testGame.game
                    .getGameBoard()
                    .getSquare(new BoardLocation(0, 5))
                    .getPiece(),
            ).toBe(testGame.aBlueHen);
            // Team B's turn
            expect(testGame.game.isTurn(testGame.teamB)).toEqual(true);
        } catch (e) {
            console.log(e);
            console.log(testGame.game.getMessage());
        }
    });

    test("(2 pts)  ActionMove - performAction when invalid", () => {
        let moveInvalid: ActionMove;

        // try an invalid move - piece on the end square
        // move red hen [0][0] to  [1][1] - piece on this end space
        moveInvalid = new ActionMove(
            testGame.game,
            new BoardLocation(0, 0),
            new BoardLocation(1, 1),
        );
        let errOccurred: boolean = false;
        try {
            moveInvalid.performAction();
        } catch (e) {
            errOccurred = true;
            expect(e).toBeInstanceOf(ActionError);
            let err: ActionError = <ActionError>e;
            expect(err.actionType).toEqual(ActionType.Move);
        } finally {
            expect(errOccurred).toEqual(true);
        }
    });
});
