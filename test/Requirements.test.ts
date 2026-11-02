import { Requirements } from "../src/game/actions/Requirements";
import { ActionType } from "../src/game/elements/Utilities";
describe("Requirment Class", () => {
    const moveRequirements: Requirements = new Requirements(ActionType.Move);
    const spawnRequirements: Requirements = new Requirements(ActionType.Spawn);
    const renewRequirements: Requirements = new Requirements(ActionType.Renew);
    const attackRequirements: Requirements = new Requirements(
        ActionType.Attack,
    );
    const recruitRequirements: Requirements = new Requirements(
        ActionType.Recruit,
    );
    const swapRequirements: Requirements = new Requirements(ActionType.Swap);

    test("(2 pts)  needsEndLocation", () => {
        // Needs end location selected
        expect(moveRequirements.needsEndLocation()).toEqual(true);
        expect(spawnRequirements.needsEndLocation()).toEqual(false);
        expect(renewRequirements.needsEndLocation()).toEqual(true);
        expect(attackRequirements.needsEndLocation()).toEqual(true);
        expect(recruitRequirements.needsEndLocation()).toEqual(true);
        expect(swapRequirements.needsEndLocation()).toEqual(true);
    });

    test("(1 pts) needsEmptyEnd", () => {
        // empty end
        expect(moveRequirements.needsEmptyEnd()).toEqual(true);
        expect(renewRequirements.needsEmptyEnd()).toEqual(false);
        expect(attackRequirements.needsEmptyEnd()).toEqual(false);
        expect(recruitRequirements.needsEmptyEnd()).toEqual(false);
        expect(swapRequirements.needsEmptyEnd()).toEqual(false);
    });

    test("(2 pts) needsOppTeamOnEnd", () => {
        // Opponent on end location
        expect(renewRequirements.needsOppTeamOnEnd()).toEqual(false);
        expect(attackRequirements.needsOppTeamOnEnd()).toEqual(true);
        expect(recruitRequirements.needsOppTeamOnEnd()).toEqual(true);
        expect(swapRequirements.needsOppTeamOnEnd()).toEqual(true);
    });
});
