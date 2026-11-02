import { Ability } from "../src/game/elements/Ability";
import { Backpack } from "../src/game/elements/Backpack";
import { Piece } from "../src/game/elements/Piece";
import { PieceBlueHen } from "../src/game/elements/PieceBlueHen";
import { PieceEvilMinion } from "../src/game/elements/PieceEvilMinion";

import { PieceMinion } from "../src/game/elements/PieceMinion";
import { ActionType } from "../src/game/elements/Utilities";

describe("PieceEvilMinion", () => {
    // EvilMinion backpack

    // Spawn - available, Swap - available, Spawn - available
    const backpackMin: Backpack = new Backpack([
        new Ability(ActionType.Spawn, false),
        new Ability(ActionType.Swap, false),
        new Ability(ActionType.Spawn, false),
    ]);

    const anEvilMinion: PieceEvilMinion = new PieceEvilMinion(
        "S",
        "Red",
        true,
        backpackMin,
        [],
    );

    const abilitySwap: Ability = new Ability(ActionType.Swap, false);
    const abilityRenew: Ability = new Ability(ActionType.Renew, false);
    abilityRenew.setExpired(true);
    abilitySwap.setExpired(true);
    const abilities: Ability[] = [abilityRenew, abilitySwap];
    const backpackHen: Backpack = new Backpack(abilities);
    // Bluehen backpack
    const aBlueHen: PieceBlueHen = new PieceBlueHen(
        "H",
        "Red",
        true,
        backpackHen,
    );

    const army: Piece[] = [aBlueHen];

    const anEvilLeader: PieceEvilMinion = new PieceEvilMinion(
        "S",
        "Red",
        true,
        new Backpack([
            new Ability(ActionType.Spawn, false),
            new Ability(ActionType.Spawn, false),
            new Ability(ActionType.Spawn, false),
        ]),
        army,
    );

    test("(3 pts) Piece instances hierarchy and constructor", () => {
        expect(anEvilMinion).toBeInstanceOf(Piece);
        expect(anEvilMinion).toBeInstanceOf(PieceMinion);
        // check the army when no soldiers
        expect(anEvilMinion.getArmy().length).toEqual(0);
        // check the army when there is a soldier
        expect(anEvilLeader.getArmy().length).toEqual(1);
        expect(anEvilLeader.getArmy()[0]).toBe(aBlueHen);
        // check that constructor set army elements to soldiers
        expect(aBlueHen.isSoldier()).toEqual(true);
        // check that the evilminion can't spawn - even though in backpack
        expect(
            anEvilMinion.getBackpack().isAvailable(ActionType.Spawn),
        ).toEqual(false);
        expect(
            anEvilLeader.getBackpack().isAvailable(ActionType.Spawn),
        ).toEqual(false);
    });

    test("(1 pts) Piece - speak", () => {
        expect(anEvilMinion.speak()).toEqual("Grrr!");
    });

    test("(1 pts) PieceEvilMinion allowableActions", () => {
        // anEvilMinion can move and recruit and attack as permanent abilities
        // and it backpack has
        // Spawn - expired, Swap - available, Spawn -expired
        expect(anEvilMinion.allowableAction(ActionType.Move)).toEqual(true);
        expect(anEvilMinion.allowableAction(ActionType.Recruit)).toEqual(true);
        expect(anEvilMinion.allowableAction(ActionType.Attack)).toEqual(true);
        expect(anEvilMinion.allowableAction(ActionType.Spawn)).toEqual(false);
        expect(anEvilMinion.allowableAction(ActionType.Swap)).toEqual(true);
        expect(anEvilMinion.allowableAction(ActionType.Renew)).toEqual(false);
    });

    test("(1 pts) PieceEvilMinion updateAction ", () => {
        let bMinion: PieceEvilMinion = new PieceEvilMinion(
            "M",
            "Red",
            true,
            backpackMin,
            army,
        );

        // shouldn't be able to spawn but should be able to recruit
        expect(bMinion.getBackpack().isAvailable(ActionType.Spawn)).toBe(false);
        expect(bMinion.allowableAction(ActionType.Spawn)).toBe(false);
        expect(bMinion.allowableAction(ActionType.Recruit)).toBe(true);

        bMinion.updateAction(ActionType.Swap);
        // used up the Swap
        expect(bMinion.getBackpack().isAvailable(ActionType.Swap)).toBe(false);
        expect(bMinion.allowableAction(ActionType.Swap)).toBe(false);
    });

    test("(1 pts) PieceEvilMinion addToArmy  ", () => {
        let bMinion: PieceMinion = new PieceMinion(
            "M",
            "Red",
            true,
            backpackMin,
        );

        expect(anEvilLeader.getArmy().length).toEqual(1);
        expect(anEvilLeader.getArmy()[0]).toBe(aBlueHen);
        // add to the army
        anEvilLeader.addToArmy(bMinion);
        expect(anEvilLeader.getArmy()[0]).toBe(aBlueHen);
        expect(anEvilLeader.getArmy().length).toEqual(2);
        expect(anEvilLeader.getArmy()[1]).toBe(bMinion);
        // check that both army elements are soldiers
        expect(aBlueHen.isSoldier()).toEqual(true);
        expect(bMinion.isSoldier()).toEqual(true);
    });

    test("(4 pts) PieceEvilMinion findSoldierIndex and removeSoldier ", () => {
        let bMinion: PieceMinion = new PieceMinion(
            "M",
            "Red",
            true,
            backpackMin,
        );

        let cMinion: PieceMinion = new PieceMinion(
            "M",
            "Red",
            true,
            backpackMin,
        );

        let dBlueHen: PieceBlueHen = new PieceBlueHen(
            "M",
            "Red",
            true,
            backpackHen,
        );

        // add aBlueHen, cMinion and dBlueHen to army but not bMinion
        anEvilMinion.addToArmy(aBlueHen);
        anEvilMinion.addToArmy(cMinion);
        anEvilMinion.addToArmy(dBlueHen);

        expect(anEvilMinion.getArmy()[0]).toBe(aBlueHen);
        expect(anEvilMinion.getArmy()[1]).toBe(cMinion);
        expect(anEvilMinion.getArmy()[2]).toBe(dBlueHen);
        expect(anEvilMinion.getArmy().length).toEqual(3);

        // check findSoldierIndex       - bMinion not in the army
        expect(anEvilMinion.findSoldierIndex(aBlueHen)).toEqual(0);
        expect(anEvilMinion.findSoldierIndex(bMinion)).toEqual(-1);
        expect(anEvilMinion.findSoldierIndex(cMinion)).toEqual(1);
        expect(anEvilMinion.findSoldierIndex(dBlueHen)).toEqual(2);

        // remove a soldier - but soldier doesn't exist in army
        anEvilMinion.removeFromArmy(bMinion);
        // no changes to army
        expect(anEvilMinion.getArmy()[0]).toBe(aBlueHen);
        expect(anEvilMinion.getArmy()[1]).toBe(cMinion);
        expect(anEvilMinion.getArmy()[2]).toBe(dBlueHen);
        expect(anEvilMinion.getArmy().length).toEqual(3);

        // add b to the army
        anEvilMinion.addToArmy(bMinion);
        expect(anEvilMinion.getArmy()[0]).toBe(aBlueHen);
        expect(anEvilMinion.getArmy()[1]).toBe(cMinion);
        expect(anEvilMinion.getArmy()[2]).toBe(dBlueHen);
        expect(anEvilMinion.getArmy()[3]).toBe(bMinion);
        expect(anEvilMinion.getArmy().length).toEqual(4);

        // remove a soldier from the middle
        anEvilMinion.removeFromArmy(cMinion);
        // army changed
        expect(anEvilMinion.getArmy()[0]).toBe(aBlueHen);
        expect(anEvilMinion.getArmy()[1]).toBe(dBlueHen);
        expect(anEvilMinion.getArmy()[2]).toBe(bMinion);
        expect(anEvilMinion.getArmy().length).toEqual(3);
        // cMinion shouldn't be a solider now
        expect(cMinion.isSoldier()).toEqual(false);

        // remove from beginning
        anEvilMinion.removeFromArmy(aBlueHen);
        expect(anEvilMinion.getArmy()[0]).toBe(dBlueHen);
        expect(anEvilMinion.getArmy()[1]).toBe(bMinion);
        expect(anEvilMinion.getArmy().length).toEqual(2);
        expect(aBlueHen.isSoldier()).toEqual(false);

        // remove from end
        anEvilMinion.removeFromArmy(bMinion);
        expect(anEvilMinion.getArmy()[0]).toBe(dBlueHen);
        expect(anEvilMinion.getArmy().length).toEqual(1);
        expect(bMinion.isSoldier()).toEqual(false);
    });
});
