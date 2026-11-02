import { Ability } from "../src/game/elements/Ability";
import { Backpack } from "../src/game/elements/Backpack";
import { Piece } from "../src/game/elements/Piece";

import { PieceMinion } from "../src/game/elements/PieceMinion";
import { ActionType } from "../src/game/elements/Utilities";

describe("Piece Minion", () => {
    // Minion backpack
    // Spawn - available, Swap - available, Spawn - available
    const backpackMin: Backpack = new Backpack([
        new Ability(ActionType.Spawn, false),
        new Ability(ActionType.Swap, false),
        new Ability(ActionType.Spawn, false),
    ]);
    const aMinion: PieceMinion = new PieceMinion("S", "Red", true, backpackMin);

    test("(1 pts) Piece instances", () => {
        expect(aMinion).toBeInstanceOf(Piece);
        expect(aMinion).toBeInstanceOf(PieceMinion);
        expect(aMinion.getSymbol()).toEqual("S");
    });

    test("(1 pts) Piece - speak", () => {
        expect(aMinion.speak()).toEqual("Bello!");
    });

    test("(1 pts) PieceMinion allowableActions", () => {
        // aMinion can move and recruit as permanent abilities
        // and it backpack has
        // Spawn - available, Swap - available
        expect(aMinion.allowableAction(ActionType.Move)).toEqual(true);
        expect(aMinion.allowableAction(ActionType.Recruit)).toEqual(true);
        expect(aMinion.allowableAction(ActionType.Swap)).toEqual(true);
        expect(aMinion.allowableAction(ActionType.Attack)).toEqual(false);
        expect(aMinion.allowableAction(ActionType.Spawn)).toEqual(true);
        expect(aMinion.allowableAction(ActionType.Renew)).toEqual(false);
    });

    test("(1 pts) PieceMinion updateAction ", () => {
        let bMinion: PieceMinion = new PieceMinion(
            "M",
            "Red",
            true,
            backpackMin,
        );
        // Spwan should be available
        expect(bMinion.getBackpack().isAvailable(ActionType.Spawn)).toBe(true);
        // two recruit actions
        bMinion.updateAction(ActionType.Recruit);
        bMinion.updateAction(ActionType.Recruit);
        // should still be able to spawn
        expect(bMinion.getBackpack().isAvailable(ActionType.Spawn)).toBe(true);
        expect(bMinion.allowableAction(ActionType.Spawn)).toBe(true);
        // one more recruit action
        bMinion.updateAction(ActionType.Recruit);

        // shouldn't be able to spawn but should be able to recruit
        expect(bMinion.getBackpack().isAvailable(ActionType.Spawn)).toBe(false);
        expect(bMinion.allowableAction(ActionType.Spawn)).toBe(false);
        expect(bMinion.allowableAction(ActionType.Recruit)).toBe(true);

        bMinion.updateAction(ActionType.Swap);
        // used up the Swap
        expect(bMinion.getBackpack().isAvailable(ActionType.Swap)).toBe(false);
        expect(bMinion.allowableAction(ActionType.Swap)).toBe(false);

        // set the spawn to available again
        bMinion
            .getBackpack()
            .setAbilityExpiration(ActionType.Spawn, false, false);
        expect(bMinion.getBackpack().isAvailable(ActionType.Spawn)).toBe(true);
    });

    test("(1 pts) Minion Piece spawn", () => {
        let aBackpack: Backpack = new Backpack([
            new Ability(ActionType.Spawn, false),
        ]);
        let aMinion: PieceMinion = new PieceMinion(
            "M",
            "Green",
            true,
            aBackpack,
        );
        aMinion.updateAction(ActionType.Recruit);
        aMinion.updateAction(ActionType.Recruit);

        let copy: PieceMinion = aMinion.spawn();

        expect(copy.getSymbol()).toEqual("m");
        expect(copy.getTeamColor()).toEqual("Green");

        expect(copy.getBackpack()).not.toBe(aMinion.getBackpack());
        expect(copy.allowableAction(ActionType.Move)).toEqual(true);
        expect(copy.allowableAction(ActionType.Attack)).toEqual(false);
        expect(copy.allowableAction(ActionType.Recruit)).toEqual(true);
        expect(copy.allowableAction(ActionType.Renew)).toEqual(false);
        expect(copy.allowableAction(ActionType.Swap)).toEqual(false);
        expect(copy.allowableAction(ActionType.Spawn)).toEqual(true);
    });
});
