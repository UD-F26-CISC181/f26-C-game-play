import { Ability } from "../src/game/elements/Ability";
import { Backpack } from "../src/game/elements/Backpack";
import { Piece } from "../src/game/elements/Piece";
import { PieceBlueHen } from "../src/game/elements/PieceBlueHen";
import { ActionType } from "../src/game/elements/Utilities";

describe("Piece ", () => {
    const abilitySwap: Ability = new Ability(ActionType.Swap, false);
    const abilityRenew: Ability = new Ability(ActionType.Renew, false);
    abilityRenew.setExpired(true);
    abilitySwap.setExpired(true);
    const abilities: Ability[] = [
        abilityRenew,
        abilitySwap,
        new Ability(ActionType.Spawn, false),
        new Ability(ActionType.Swap, false),
    ];
    const backpackHen: Backpack = new Backpack(abilities);
    // Bluehen backpack
    // Renew - expired, Swap - expired, Spawn - available, Swap - available
    const aBlueHen: PieceBlueHen = new PieceBlueHen(
        "B",
        "Red",
        true,
        backpackHen,
    );

    test("(1 pts) Piece instances and constructor", () => {
        expect(aBlueHen).toBeInstanceOf(Piece);
        expect(aBlueHen).toBeInstanceOf(PieceBlueHen);
        expect(aBlueHen.getSymbol()).toEqual("B");
    });

    test("(1 pts) Piece - speak", () => {
        expect(aBlueHen.speak()).toEqual("Go UD!");
    });

    test("(1 pts) PieceBlueHen allowableActions", () => {
        // aBlueHen can move and attack as permanent abilities
        // and its backpack has
        // Renew - expired, Swap - expired, Spawn - available, Swap - available
        expect(aBlueHen.allowableAction(ActionType.Move)).toEqual(true);
        expect(aBlueHen.allowableAction(ActionType.Attack)).toEqual(true);
        expect(aBlueHen.allowableAction(ActionType.Spawn)).toEqual(true);
        expect(aBlueHen.allowableAction(ActionType.Renew)).toEqual(false);
        expect(aBlueHen.allowableAction(ActionType.Recruit)).toEqual(false);
        expect(aBlueHen.allowableAction(ActionType.Swap)).toEqual(true);
    });

    test("(1 pts) PieceBlueHen updateAction", () => {
        let bBlueHen: PieceBlueHen = new PieceBlueHen(
            "H",
            "Red",
            true,
            backpackHen,
        );

        // Renew is expired
        expect(bBlueHen.getBackpack().isAvailable(ActionType.Renew)).toBe(
            false,
        );
        // Swap is available
        expect(bBlueHen.getBackpack().isAvailable(ActionType.Swap)).toBe(true);
        // use the Swap
        bBlueHen.updateAction(ActionType.Swap);
        // Swap should be expired now
        expect(bBlueHen.getBackpack().isAvailable(ActionType.Swap)).toBe(false);

        // set the Swap back to available
        bBlueHen
            .getBackpack()
            .setAbilityExpiration(ActionType.Swap, false, false);
        expect(bBlueHen.getBackpack().isAvailable(ActionType.Swap)).toBe(true);

        bBlueHen.updateAction(ActionType.Move);
        // Move should still be available
        expect(bBlueHen.allowableAction(ActionType.Move)).toBe(true);

        bBlueHen.updateAction(ActionType.Attack);
        // Attack should still be available
        expect(bBlueHen.allowableAction(ActionType.Attack)).toBe(true);
    });

    test("(1 pts) Piece BlueHen spawn", () => {
        let copyBH: PieceBlueHen = aBlueHen.spawn();

        expect(copyBH.getSymbol()).toEqual("b");
        expect(copyBH.getTeamColor()).toEqual("Red");
        expect(copyBH.isOriginal()).toEqual(false);
        expect(copyBH.getBackpack()).not.toBe(aBlueHen.getBackpack());
        expect(copyBH.allowableAction(ActionType.Move)).toEqual(true);
        expect(copyBH.allowableAction(ActionType.Attack)).toEqual(true);
        expect(copyBH.allowableAction(ActionType.Recruit)).toEqual(false);
        expect(copyBH.allowableAction(ActionType.Spawn)).toEqual(true);
        expect(copyBH.allowableAction(ActionType.Swap)).toEqual(true);
    });
});
