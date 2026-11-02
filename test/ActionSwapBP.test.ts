import { Action } from "../src/game/actions/Action";
import { ActionSwapBP } from "../src/game/actions/ActionSwapBP";
import { ActionType, BoardLocation } from "../src/game/elements/Utilities";
import { TestGame } from "./TestGame";
import { Ability } from "../src/game/elements/Ability";
import { ActionError } from "../src/ActionError";
import { Backpack } from "../src/game/elements/Backpack";

describe("Action Swap", () => {
    let testGame: TestGame = new TestGame();
    // change to Team B's turn
    testGame.game.changeTurn();

    // create an instance of ActionSwap
    let swapAction: ActionSwapBP = new ActionSwapBP(
        testGame.game,
        new BoardLocation(1, 1),
        new BoardLocation(3, 3),
    );

    test("(1 pts)  ActionSwapBP - hierarchy", () => {
        expect(swapAction).toBeInstanceOf(Action);
    });

    test("(1 pts)  ActionSwapBP - testing valid action for Start Location Requirements ", () => {
        // try an invalid swap - start square
        // out of bounds  [2][-1]
        let swapActionInvalid = new ActionSwapBP(
            testGame.game,
            new BoardLocation(2, -1),
            new BoardLocation(2, 2),
        );
        expect(swapActionInvalid.isValidAction()).toEqual(false);

        // try invalid - no piece on the start square [2][1]
        swapActionInvalid = new ActionSwapBP(
            testGame.game,
            new BoardLocation(2, 1),
            new BoardLocation(2, 2),
        );
        expect(swapActionInvalid.isValidAction()).toEqual(false);

        // try start square with opponents piece [0][0]
        swapActionInvalid = new ActionSwapBP(
            testGame.game,
            new BoardLocation(0, 0),
            new BoardLocation(2, 2),
        );
        expect(swapActionInvalid.isValidAction()).toEqual(false);

        // try start square with piece that can't swap [3][3]
        // not in this backpack
        swapActionInvalid = new ActionSwapBP(
            testGame.game,
            new BoardLocation(3, 3),
            new BoardLocation(2, 2),
        );
        expect(swapActionInvalid.isValidAction()).toEqual(false);
    });

    test("(1 pts)  ActionSwapBP -  testing valid action for End Location Requirements ", () => {
        // try an invalid swap - the end square
        // out of bounds [8][8]
        let swapAction = new ActionSwapBP(
            testGame.game,
            new BoardLocation(1, 1),
            new BoardLocation(8, 8),
        );
        expect(swapAction.isValidAction()).toEqual(false);

        // try an invalid swap - no piece on the end square
        swapAction = new ActionSwapBP(
            testGame.game,
            new BoardLocation(1, 1),
            new BoardLocation(0, 4),
        );
        expect(swapAction.isValidAction()).toEqual(false);

        // try an invalid swap - piece on the end square
        // belongs to current team
        swapAction = new ActionSwapBP(
            testGame.game,
            new BoardLocation(1, 1),
            new BoardLocation(3, 3),
        );
        expect(swapAction.isValidAction()).toEqual(false);

        // try a valid
        swapAction = new ActionSwapBP(
            testGame.game,
            new BoardLocation(1, 1),
            new BoardLocation(2, 2),
        );
        expect(swapAction.isValidAction()).toEqual(true);
    });

    test("(1 pts)  ActionSwapBP - validAction, performAction", () => {
        // create some more abilities
        let abilitySpawn: Ability = new Ability(ActionType.Spawn, false);
        abilitySpawn.setExpired(true);
        let abilitySwap: Ability = new Ability(ActionType.Swap, false);
        abilitySwap.setExpired(true);
        let abilityRenew: Ability = new Ability(ActionType.Renew, false);
        abilityRenew.setExpired(true);

        // aMinion - load some abilities
        testGame.aMinion
            .getBackpack()
            .getAbilities()
            .push(abilityRenew, abilitySwap, abilitySpawn);

        // set these temp variables up so we can test if actual backpack swapped
        let henBackpack: Backpack = testGame.bBlueHen.getBackpack();
        let minionBackpack: Backpack = testGame.aMinion.getBackpack();

        console.log(
            "Before Swap Backpack using hen on [1][1] - with minion on [2][2] : \n" +
                testGame.game.toString(),
        );

        let swapValid: ActionSwapBP = new ActionSwapBP(
            testGame.game,
            new BoardLocation(1, 1),
            new BoardLocation(2, 2),
        );

        // swap using hen on [1][1] - with minion on [2][2]
        expect(swapValid.isValidAction()).toEqual(true);

        try {
            swapValid.performAction();
            console.log(
                "After Swap Backpack using hen on [1][1] - with ghost on [2][2] : \n" +
                    testGame.game.toString(),
            );
            // minion on [2][2] should still be there
            // hen on [1][1] should still be there

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

            // hen should have the minon's backpack
            // and all abilities should be set to available

            expect(testGame.bBlueHen.getBackpack()).toBe(minionBackpack);
            expect(abilitySwap.isExpired()).toEqual(false);
            expect(abilitySpawn.isExpired()).toEqual(false);
            expect(abilityRenew.isExpired()).toEqual(false);

            // aMinion should now have the hens backpack with Swap expired
            expect(testGame.aMinion.getBackpack()).toBe(henBackpack);
            expect(
                testGame.aMinion.getBackpack().isAvailable(ActionType.Swap),
            ).toEqual(false);

            // Team A's turn
            expect(testGame.game.isTurn(testGame.teamA)).toEqual(true);
        } catch (e) {
            console.log(e);
            console.log(testGame.game.getMessage());
        }
    });

    test("(1 pts)  ActionSwapBP - performAction when invalid", () => {
        let swapInValid: ActionSwapBP = new ActionSwapBP(
            testGame.game,
            new BoardLocation(1, 3),
            new BoardLocation(3, 3),
        );

        let errOccurred: boolean = false;
        try {
            swapInValid.performAction();
        } catch (e) {
            errOccurred = true;
            expect(e).toBeInstanceOf(ActionError);
            let err: ActionError = <ActionError>e;
            expect(err.actionType).toEqual(ActionType.Swap);
        } finally {
            expect(errOccurred).toEqual(true);
        }
    });
});
