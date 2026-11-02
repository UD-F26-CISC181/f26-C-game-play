import { ActionError } from "../src/ActionError";
import { ActionType } from "../src/game/elements/Utilities";

describe("ActionError Class", () => {
    test("(1 pts) Create Instance of ActionError ", () => {
        const actionError: ActionError = new ActionError(
            "Spawn Error",
            ActionType.Spawn,
        );
        expect(actionError).toBeInstanceOf(ActionError);
        expect(actionError).toBeInstanceOf(Error);
    });

    test("(2 pts) ActionError member fields", () => {
        const actionError: ActionError = new ActionError(
            "Error in Attack Action",
            ActionType.Attack,
        );
        expect(actionError.actionType).toEqual(ActionType.Attack);
        expect(actionError.name).toEqual("Action Error");
        expect(actionError.message).toEqual("Error in Attack Action");
    });
});
