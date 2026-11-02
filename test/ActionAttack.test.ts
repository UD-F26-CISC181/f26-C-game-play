import { ActionError } from "../src/ActionError";
import { Action } from "../src/game/actions/Action";
import { ActionAttack } from "../src/game/actions/ActionAttack";
import { ActionType, BoardLocation } from "../src/game/elements/Utilities";
import { TestGame } from "./TestGame";

describe("Action Attack", () => {
    let testGame: TestGame = new TestGame();
    console.log("At Start: \n" + testGame.game.getGameBoard().toString());
    let attack: ActionAttack = new ActionAttack(
        testGame.game,
        new BoardLocation(0, 0),
        new BoardLocation(1, 1),
    );

    test("(1 pts)  ActionAttack - hierarchy", () => {
        expect(attack).toBeInstanceOf(Action);
    });

    test("(1 pts)  ActionAttack -  testing valid action for Start Location Requirements ", () => {
        // try an invalid attack - start square
        // out of bounds  [2][11]
        let attackInvalid = new ActionAttack(
            testGame.game,
            new BoardLocation(2, 11),
            new BoardLocation(1, 1),
        );
        expect(attackInvalid.isValidAction()).toEqual(false);

        // try invalid - no piece on the start square [2][1]
        attackInvalid = new ActionAttack(
            testGame.game,
            new BoardLocation(2, 1),
            new BoardLocation(1, 1),
        );
        expect(attackInvalid.isValidAction()).toEqual(false);

        // try start square with opponents piece [1][1]
        attackInvalid = new ActionAttack(
            testGame.game,
            new BoardLocation(1, 1),
            new BoardLocation(0, 0),
        );
        expect(attackInvalid.isValidAction()).toEqual(false);

        // try start square with piece that can't attack [2][2]
        //  a minion here
        attackInvalid = new ActionAttack(
            testGame.game,
            new BoardLocation(2, 2),
            new BoardLocation(1, 1),
        );
        expect(attackInvalid.isValidAction()).toEqual(false);
    });

    test("(1 pts)  ActionAttack -  testing valid action for End Location Requirements ", () => {
        // try an invalid attack - the end square
        // out of bounds [0][-2]
        let attacker = new ActionAttack(
            testGame.game,
            new BoardLocation(0, 0),
            new BoardLocation(0, -2),
        );
        expect(attacker.isValidAction()).toEqual(false);

        // try an invalid attack - no piece on the end square
        attacker = new ActionAttack(
            testGame.game,
            new BoardLocation(0, 0),
            new BoardLocation(1, 3),
        );
        expect(attacker.isValidAction()).toEqual(false);

        // try an invalid attack - piece on the end square
        // belongs to current team
        attacker = new ActionAttack(
            testGame.game,
            new BoardLocation(0, 0),
            new BoardLocation(2, 2),
        );
        expect(attacker.isValidAction()).toEqual(false);

        // try a valid
        attacker = new ActionAttack(
            testGame.game,
            new BoardLocation(0, 0),
            new BoardLocation(1, 1),
        );
        expect(attacker.isValidAction()).toEqual(true);
    });

    test("(1 pts)  ActionAttack - validAction, performAction", () => {
        let attackValid: ActionAttack = new ActionAttack(
            testGame.game,
            new BoardLocation(0, 0),
            new BoardLocation(1, 1),
        );
        // attack with blue hen [0][0] - attack blue hen on [1][1]
        expect(attackValid.isValidAction()).toEqual(true);
        try {
            attackValid.performAction();
            console.log(
                "After Attack [0][0] on [1][1]: \n" +
                    testGame.game.getGameBoard().toString(),
            );
            // blue teams hen on [1][1] should be removed from board
            // should still be on Blue's team but set to inactive
            // and red team's blue hen should move to [1][1]
            expect(
                testGame.game
                    .getGameBoard()
                    .getSquare(new BoardLocation(0, 0))
                    .isEmpty(),
            ).toEqual(true);
            expect(
                testGame.game
                    .getGameBoard()
                    .getSquare(new BoardLocation(1, 1))
                    .getPiece(),
            ).toBe(testGame.aBlueHen);

            expect(testGame.teamB.getPieces().length).toEqual(1);
            expect(testGame.teamA.getPieces().length).toEqual(2);

            // Team B's turn
            expect(testGame.game.isTurn(testGame.teamB)).toEqual(true);
        } catch (e) {
            console.log(e);
            console.log(testGame.game.getMessage());
        }
    });

    test("(1 pts)  ActionAttack - performAction when invalid", () => {
        let attackInValid: ActionAttack = new ActionAttack(
            testGame.game,
            new BoardLocation(3, 3),
            new BoardLocation(1, 1),
        );

        let errOccurred: boolean = false;
        try {
            attackInValid.performAction();
        } catch (e) {
            errOccurred = true;
            expect(e).toBeInstanceOf(ActionError);
            let err: ActionError = <ActionError>e;
            expect(err.actionType).toEqual(ActionType.Attack);
        } finally {
            expect(errOccurred).toEqual(true);
        }
    });
});
