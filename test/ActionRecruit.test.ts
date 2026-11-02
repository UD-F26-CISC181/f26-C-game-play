import { ActionError } from "../src/ActionError";
import { Action } from "../src/game/actions/Action";
import { ActionRecruit } from "../src/game/actions/ActionRecruit";
import { ActionType, BoardLocation } from "../src/game/elements/Utilities";
import { TestGame } from "./TestGame";

describe("Action Recruit", () => {
    let testGame: TestGame = new TestGame();
    console.log("At Start: \n" + testGame.game.getGameBoard().toString());
    let recruitMinion: ActionRecruit = new ActionRecruit(
        testGame.game,
        new BoardLocation(2, 2),
        new BoardLocation(1, 1),
    );

    test("(1 pts)  ActionRecruit - hierarchy", () => {
        expect(recruitMinion).toBeInstanceOf(Action);
    });

    test("(1 pts)  ActionRecruit -  testing valid action for Start Location Requirements ", () => {
        // try an invalid recruit - start square
        // out of bounds  [2][11]
        let recruitMinionInvalid = new ActionRecruit(
            testGame.game,
            new BoardLocation(2, 11),
            new BoardLocation(1, 1),
        );
        expect(recruitMinionInvalid.isValidAction()).toEqual(false);

        // try invalid - no piece on the start square [2][1]
        recruitMinionInvalid = new ActionRecruit(
            testGame.game,
            new BoardLocation(2, 1),
            new BoardLocation(1, 1),
        );
        expect(recruitMinionInvalid.isValidAction()).toEqual(false);

        // try start square with opponents piece [3][3]
        recruitMinionInvalid = new ActionRecruit(
            testGame.game,
            new BoardLocation(3, 3),
            new BoardLocation(1, 1),
        );
        expect(recruitMinionInvalid.isValidAction()).toEqual(false);

        // try start square with piece that can't recruit [0][0]
        // hen can't recruit
        recruitMinionInvalid = new ActionRecruit(
            testGame.game,
            new BoardLocation(0, 0),
            new BoardLocation(1, 1),
        );
        expect(recruitMinionInvalid.isValidAction()).toEqual(false);
    });

    test("(1 pts)  ActionRecruit -  testing valid action for End Location Requirements ", () => {
        // try an invalid recruit - the end square
        // out of bounds [8][0]
        let recruitAction = new ActionRecruit(
            testGame.game,
            new BoardLocation(2, 2),
            new BoardLocation(8, 0),
        );
        expect(recruitAction.isValidAction()).toEqual(false);

        // try an invalid recruit - no piece on the end square
        recruitAction = new ActionRecruit(
            testGame.game,
            new BoardLocation(2, 2),
            new BoardLocation(0, 4),
        );
        expect(recruitAction.isValidAction()).toEqual(false);

        // try an invalid recruit - piece on the end square
        // belongs to current team
        recruitAction = new ActionRecruit(
            testGame.game,
            new BoardLocation(2, 2),
            new BoardLocation(0, 0),
        );
        expect(recruitAction.isValidAction()).toEqual(false);

        // try a valid
        recruitAction = new ActionRecruit(
            testGame.game,
            new BoardLocation(2, 2),
            new BoardLocation(1, 1),
        );
        expect(recruitAction.isValidAction()).toEqual(true);
    });

    test("(1 pts)  ActionRecruit - validAction, performAction", () => {
        let recruitValid: ActionRecruit = new ActionRecruit(
            testGame.game,
            new BoardLocation(2, 2),
            new BoardLocation(1, 1),
        );
        // recruit with minion on [2][2] - hen [1][1]
        expect(recruitValid.isValidAction()).toEqual(true);
        try {
            recruitValid.performAction();
            console.log(
                "After Recruit Hen on [1][1]: \n" +
                    testGame.game.getGameBoard().toString(),
            );
            // minion on [2][2] should still be there
            // hen on [1][1] should still be there
            // but should be on reds team now
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
            expect(
                testGame.game
                    .getGameBoard()
                    .getSquare(new BoardLocation(1, 1))
                    .isEmpty(),
            ).toEqual(false);
            expect(
                testGame.game
                    .getGameBoard()
                    .getSquare(new BoardLocation(1, 1))
                    .getPiece(),
            ).toBe(testGame.bBlueHen);
            // blue's hen should have switched teams
            expect(testGame.teamA.getPieces().length).toEqual(3);
            expect(testGame.bBlueHen.getTeamColor()).toEqual(
                testGame.teamAColor,
            );
            expect(testGame.teamB.getPieces().length).toEqual(1);

            // Team B's turn
            expect(testGame.game.isTurn(testGame.teamB)).toEqual(true);
        } catch (e) {
            console.log(e);
            console.log(testGame.game.getMessage());
        }
    });

    test("(1 pts)  ActionRecruit - performAction when invalid", () => {
        // try recruiting own piece
        let recruitInValid: ActionRecruit = new ActionRecruit(
            testGame.game,
            new BoardLocation(2, 2),
            new BoardLocation(0, 0),
        );

        let errOccurred: boolean = false;
        try {
            recruitInValid.performAction();
        } catch (e) {
            errOccurred = true;
            expect(e).toBeInstanceOf(ActionError);
            let err: ActionError = <ActionError>e;
            expect(err.actionType).toEqual(ActionType.Recruit);
        } finally {
            expect(errOccurred).toEqual(true);
        }
    });
});
