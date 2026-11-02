import { ActionError } from "../src/ActionError";
import { Action } from "../src/game/actions/Action";
import { ActionRenew } from "../src/game/actions/ActionRenew";
import { Ability } from "../src/game/elements/Ability";
import { ActionType, BoardLocation } from "../src/game/elements/Utilities";
import { TestGame } from "./TestGame";

describe("Action Renew", () => {
    let testGame: TestGame = new TestGame();

    let renewAction: ActionRenew = new ActionRenew(
        testGame.game,
        new BoardLocation(2, 2),
        new BoardLocation(1, 1),
    );

    test("(1 pts)  ActionRenew - hierarchy", () => {
        expect(renewAction).toBeInstanceOf(Action);
    });

    test("(2 pts)  ActionRenew - testing valid action for Start Location Requirements ", () => {
        // try an invalid renew - start square
        // out of bounds  [2][11]
        let renewActionInvalid = new ActionRenew(
            testGame.game,
            new BoardLocation(2, 11),
            new BoardLocation(0, 0),
        );
        expect(renewActionInvalid.isValidAction()).toEqual(false);

        // try invalid - no piece on the start square [2][4]
        renewActionInvalid = new ActionRenew(
            testGame.game,
            new BoardLocation(2, 4),
            new BoardLocation(0, 0),
        );
        expect(renewActionInvalid.isValidAction()).toEqual(false);

        // try start square with opponents piece [1][1]
        renewActionInvalid = new ActionRenew(
            testGame.game,
            new BoardLocation(5, 5),
            new BoardLocation(0, 0),
        );
        expect(renewActionInvalid.isValidAction()).toEqual(false);
        // try start square with piece that can't renew [0][0]
        // piece doesn't have it in their backpack
        renewActionInvalid = new ActionRenew(
            testGame.game,
            new BoardLocation(0, 0),
            new BoardLocation(1, 1),
        );
        expect(renewActionInvalid.isValidAction()).toEqual(false);
    });

    test("(1 pts)  ActionRenew - testing valid action for End Location Requirements ", () => {
        // try an invalid renew - the end square
        // out of bounds [8][0]
        let renewActionTester = new ActionRenew(
            testGame.game,
            new BoardLocation(2, 2),
            new BoardLocation(8, 0),
        );
        expect(renewActionTester.isValidAction()).toEqual(false);

        // try an invalid renew - no piece on the end square
        renewActionTester = new ActionRenew(
            testGame.game,
            new BoardLocation(2, 2),
            new BoardLocation(1, 3),
        );
        expect(renewActionTester.isValidAction()).toEqual(false);

        // try an invalid renew - piece on the end square
        // belongs to opponent team
        // SHOULD only be able to renew your team's backpack
        renewActionTester = new ActionRenew(
            testGame.game,
            new BoardLocation(2, 2),
            new BoardLocation(1, 1),
        );
        expect(renewActionTester.isValidAction()).toEqual(false);

        // try a valid
        renewActionTester = new ActionRenew(
            testGame.game,
            new BoardLocation(2, 2),
            new BoardLocation(0, 0),
        );
        expect(renewActionTester.isValidAction()).toEqual(true);
    });

    test("(1 pts)  ActionRenew - validAction, performAction", () => {
        let abilitySpawn: Ability = new Ability(ActionType.Spawn, false);
        abilitySpawn.setExpired(true);
        let abilitySwap: Ability = new Ability(ActionType.Swap, false);
        abilitySwap.setExpired(true);
        let abilityRenew: Ability = new Ability(ActionType.Renew, false);
        abilityRenew.setExpired(true);

        testGame.aBlueHen
            .getBackpack()
            .getAbilities()
            .push(abilityRenew, abilitySpawn, abilitySwap);

        console.log(
            "Before Renew of [0][0] backpack: \n" + testGame.game.toString(),
        );

        expect(
            testGame.aBlueHen.getBackpack().isAvailable(ActionType.Swap),
        ).toEqual(true);
        expect(
            testGame.aBlueHen.getBackpack().isAvailable(ActionType.Renew),
        ).toEqual(false);
        expect(
            testGame.aBlueHen.getBackpack().isAvailable(ActionType.Spawn),
        ).toEqual(false);

        let renewValid: ActionRenew = new ActionRenew(
            testGame.game,
            new BoardLocation(2, 2),
            new BoardLocation(0, 0),
        );

        try {
            // renew with hen on [2][2] - target hen on [0][0]
            expect(renewValid.isValidAction()).toEqual(true);
            renewValid.performAction();
            console.log(
                "After Piece on [2][2] uses Renew on [0][0] backpack: \n" +
                    testGame.game.toString(),
            );
            // hen on [0][0] should have all its abilities set to true
            // minion on [2][2] should have it's renew ability expired
            // no pieces should have been moved on board
            // both pieces should still be active
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
                    .getSquare(new BoardLocation(0, 0))
                    .isEmpty(),
            ).toEqual(false);
            expect(
                testGame.game
                    .getGameBoard()
                    .getSquare(new BoardLocation(0, 0))
                    .getPiece(),
            ).toBe(testGame.aBlueHen);

            // all of hen's abilities set to available
            expect(
                testGame.aBlueHen.getBackpack().isAvailable(ActionType.Spawn),
            ).toEqual(true);
            expect(
                testGame.aBlueHen.getBackpack().isAvailable(ActionType.Swap),
            ).toEqual(true);
            expect(
                testGame.aBlueHen.getBackpack().isAvailable(ActionType.Renew),
            ).toEqual(true);

            //minions abilities to renew expired
            expect(
                testGame.aMinion.getBackpack().isAvailable(ActionType.Renew),
            ).toEqual(false);

            // Team B's turn
            expect(testGame.game.isTurn(testGame.teamB)).toEqual(true);
        } catch (e) {
            console.log(e);
            console.log(testGame.game.getMessage());
        }
    });

    test("(1 pts)  ActionRenew - performAction when invalid", () => {
        let renewInValid: ActionRenew = new ActionRenew(
            testGame.game,
            new BoardLocation(0, 0),
            new BoardLocation(1, 1),
        );
        // can't renew
        let errOccurred: boolean = false;
        try {
            renewInValid.performAction();
        } catch (e) {
            errOccurred = true;
            expect(e).toBeInstanceOf(ActionError);
            let err: ActionError = <ActionError>e;
            expect(err.actionType).toEqual(ActionType.Renew);
        } finally {
            expect(errOccurred).toEqual(true);
        }
    });
});
