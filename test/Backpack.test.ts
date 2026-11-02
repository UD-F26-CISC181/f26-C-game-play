import { ActionType } from "../src/game/elements/Utilities";
import { Ability } from "../src/game/elements/Ability";
import { Backpack } from "../src/game/elements/Backpack";

describe("Backpack Class", () => {
    const abilitySpawn: Ability = new Ability(ActionType.Spawn, false);
    abilitySpawn.setExpired(true);
    const abilitySwap: Ability = new Ability(ActionType.Swap, false);
    const abilityRenew: Ability = new Ability(ActionType.Renew, false);
    abilityRenew.setExpired(true);

    // Spawn is expired, Swap is available, Renew is expired

    test("(1 pts) Create Instance - getters", () => {
        const abilities = [abilitySpawn, abilitySwap];
        const backpack = new Backpack(abilities);
        expect(backpack).toBeInstanceOf(Backpack);
        expect(backpack.getAbilities()).toBe(abilities);
    });

    test("(1 pts) setter", () => {
        const abilities: Ability[] = [abilitySpawn, abilityRenew];
        const backpack: Backpack = new Backpack([]);
        backpack.setAbilities(abilities);
        expect(backpack.getAbilities()).toBe(abilities);
    });

    test("(1 pts) isAvailable", () => {
        const abilities: Ability[] = [
            new Ability(ActionType.Spawn, false),
            new Ability(ActionType.Renew, false),
            new Ability(ActionType.Renew, false),
            new Ability(ActionType.Swap, false),
        ];

        abilities[1].setExpired(true);
        abilities[3].setExpired(true);

        const backpack: Backpack = new Backpack(abilities);
        expect(backpack.isAvailable(ActionType.Spawn)).toBe(true);
        expect(backpack.isAvailable(ActionType.Renew)).toBe(true);
        expect(backpack.isAvailable(ActionType.Swap)).toBe(false);
    });

    test("(1 pts) setAbilityExpiration", () => {
        const abilRenew1: Ability = new Ability(ActionType.Renew, false);
        const abilRenew2: Ability = new Ability(ActionType.Renew, false);
        const abilRenew3: Ability = new Ability(ActionType.Renew, false);
        const abilSwap: Ability = new Ability(ActionType.Swap, false);
        const abilities: Ability[] = [
            abilRenew1,
            abilRenew2,
            abilSwap,
            abilRenew3,
        ];

        abilRenew2.setExpired(true);
        abilSwap.setExpired(true);
        abilRenew3.setExpired(true);

        const backpack: Backpack = new Backpack(abilities);
        // Renew1 is available, Renew23 is expired, Swap is expired, Renew is expired
        // change ONE Renew ablility expire field to false
        backpack.setAbilityExpiration(ActionType.Renew, false, false);
        // 2nd element should not be expired now
        expect(abilRenew1.isExpired()).toEqual(false);
        expect(abilRenew2.isExpired()).toEqual(false);
        expect(abilSwap.isExpired()).toEqual(true);
        expect(abilRenew3.isExpired()).toEqual(true);

        // NOW
        // Renew is available, Renew is available, Swap is expired, Renew is expired
        // change ONE Renew ablility expire field to true
        backpack.setAbilityExpiration(ActionType.Renew, true, false);
        // second element should get updated to false
        expect(abilRenew1.isExpired()).toEqual(true);
        expect(abilRenew2.isExpired()).toEqual(false);
        expect(abilSwap.isExpired()).toEqual(true);
        expect(abilRenew3.isExpired()).toEqual(true);

        // Renew is expired, Renew is available, Swap is expired, Renew is expired
        // change ONE Swap ablility expire field to true
        backpack.setAbilityExpiration(ActionType.Swap, true, false);
        // no elements should get updated
        expect(abilRenew1.isExpired()).toEqual(true);
        expect(abilRenew2.isExpired()).toEqual(false);
        expect(abilSwap.isExpired()).toEqual(true);
        expect(abilRenew3.isExpired()).toEqual(true);

        // Renew is expired, Renew is available, Swap is expired, Renew is expired
        backpack.setAbilityExpiration(ActionType.Swap, false, false);
        // change ONE Swap ablility expire field to false
        // third element should get updated to false
        expect(abilRenew1.isExpired()).toEqual(true);
        expect(abilRenew2.isExpired()).toEqual(false);
        expect(abilSwap.isExpired()).toEqual(false);
        expect(abilRenew3.isExpired()).toEqual(true);

        // Renew is expired, Renew is avaiable, Swap is available, Renew is expired
        abilRenew1.setExpired(false);
        // Renew is available, Renew is avaiable, Swap is available, Renew is expired
        backpack.setAbilityExpiration(ActionType.Renew, false, false);
        // last element should get updated to false
        expect(abilRenew1.isExpired()).toEqual(false);
        expect(abilRenew2.isExpired()).toEqual(false);
        expect(abilSwap.isExpired()).toEqual(false);
        expect(abilRenew3.isExpired()).toEqual(false);

        // chenge ALL Renew to true - (Swap stays false)
        backpack.setAbilityExpiration(ActionType.Renew, true, true);
        expect(abilRenew1.isExpired()).toEqual(true);
        expect(abilRenew2.isExpired()).toEqual(true);
        expect(abilSwap.isExpired()).toEqual(false);
        expect(abilRenew3.isExpired()).toEqual(true);

        abilRenew2.setExpired(true);
        abilSwap.setExpired(true);
        // chenge ALL Renew to false - (Swap stays true)
        backpack.setAbilityExpiration(ActionType.Renew, false, true);
        expect(abilRenew1.isExpired()).toEqual(false);
        expect(abilRenew2.isExpired()).toEqual(false);
        expect(abilSwap.isExpired()).toEqual(true);
        expect(abilRenew3.isExpired()).toEqual(false);
    });

    test("(1 pts) setAllExpirations method", () => {
        // Spawn is expired, Swap is available, Renew is expired
        abilitySpawn.setExpired(true);
        abilitySwap.setExpired(false);
        abilityRenew.setExpired(true);

        const abilities: Ability[] = [abilitySpawn, abilitySwap, abilityRenew];
        const backpack: Backpack = new Backpack(abilities);
        expect(backpack.getAbilities()[0].isExpired()).toBe(true);
        expect(backpack.getAbilities()[1].isExpired()).toBe(false);
        expect(backpack.getAbilities()[2].isExpired()).toBe(true);
        backpack.setAllExpirations(false);
        expect(backpack.getAbilities()[0].isExpired()).toBe(false);
        expect(backpack.getAbilities()[1].isExpired()).toBe(false);
        expect(backpack.getAbilities()[2].isExpired()).toBe(false);
        backpack.setAllExpirations(true);
        expect(backpack.getAbilities()[0].isExpired()).toBe(true);
        expect(backpack.getAbilities()[1].isExpired()).toBe(true);
        expect(backpack.getAbilities()[2].isExpired()).toBe(true);
    });

    test("(1 pts) empty backpack", () => {
        const abilities: Ability[] = [abilitySpawn, abilitySwap, abilityRenew];
        const backpack: Backpack = new Backpack(abilities);
        backpack.emptyBackpack();
        expect(backpack.getAbilities().length).toEqual(0);
    });

    test("(1 pts) clone", () => {
        const abilities: Ability[] = [
            new Ability(ActionType.Renew, false),
            new Ability(ActionType.Spawn, true),
            new Ability(ActionType.Swap, false),
            new Ability(ActionType.Spawn, false),
        ];

        abilities[0].setExpired(true);
        abilities[3].setExpired(true);

        const backpack: Backpack = new Backpack(abilities);
        const copyBP: Backpack = backpack.clone();
        expect(copyBP).not.toBe(backpack);
        expect(copyBP.getAbilities()).not.toBe(backpack.getAbilities());

        expect(backpack.getAbilities()[0].isExpired()).toBe(
            copyBP.getAbilities()[0].isExpired(),
        );

        expect(backpack.getAbilities()[0].isPermanent()).toBe(
            copyBP.getAbilities()[0].isPermanent(),
        );

        expect(backpack.getAbilities()[0].getDescription()).toBe(
            copyBP.getAbilities()[0].getDescription(),
        );

        expect(backpack.getAbilities()[1].isExpired()).toBe(
            copyBP.getAbilities()[1].isExpired(),
        );
        expect(backpack.getAbilities()[1].getDescription()).toBe(
            copyBP.getAbilities()[1].getDescription(),
        );
        expect(backpack.getAbilities()[1].isPermanent()).toBe(
            copyBP.getAbilities()[1].isPermanent(),
        );

        expect(backpack.getAbilities()[2].isExpired()).toBe(
            copyBP.getAbilities()[2].isExpired(),
        );

        expect(backpack.getAbilities()[2].getDescription()).toBe(
            copyBP.getAbilities()[2].getDescription(),
        );

        expect(backpack.getAbilities()[2].isPermanent()).toBe(
            copyBP.getAbilities()[2].isPermanent(),
        );
    });

    test("(1 pts) toString", () => {
        const abilities: Ability[] = [
            new Ability(ActionType.Renew, true),
            new Ability(ActionType.Renew, false),
            new Ability(ActionType.Swap, true),
        ];
        abilities[0].setExpired(true);
        abilities[2].setExpired(true);

        const backpack1: Backpack = new Backpack(abilities);

        expect(backpack1.toString()).toEqual(
            "[ Renew:expired Renew:available Swap:expired ]",
        );
    });
});
