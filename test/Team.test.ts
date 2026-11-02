import { Ability } from "../src/game/elements/Ability";
import { Backpack } from "../src/game/elements/Backpack";
import { Piece } from "../src/game/elements/Piece";
import { PieceBlueHen } from "../src/game/elements/PieceBlueHen";
import { PieceMinion } from "../src/game/elements/PieceMinion";
import { Team } from "../src/game/elements/Team";
import { ActionType } from "../src/game/elements/Utilities";

describe("Team - Problem 5", () => {
    const aTeamColor: string = "Red";
    const bTeamColor: string = "Blue";

    const abilitySwap: Ability = new Ability(ActionType.Swap, false);
    const abilityRenew: Ability = new Ability(ActionType.Renew, false);
    abilityRenew.setExpired(true);
    abilitySwap.setExpired(true);
    const abilities: Ability[] = [
        abilityRenew,
        abilitySwap,
        new Ability(ActionType.Spawn, false),
        new Ability(ActionType.Spawn, false),
    ];
    const backpackHen: Backpack = new Backpack(abilities);
    // Bluehen backpack
    // Renew - expired, Swap - expired, Spawn - available, Swap - available
    const aBlueHen: Piece = new PieceBlueHen(
        "H",
        aTeamColor,
        true,
        backpackHen,
    );
    // Minion backpack
    // Spawn - available, Revive - available
    const backpackMin: Backpack = new Backpack([
        new Ability(ActionType.Spawn, false),
    ]);
    const aMinion: Piece = new PieceMinion("M", aTeamColor, true, backpackMin);

    const aPieces: Piece[] = [aBlueHen, aMinion];
    const bBlueHen: Piece = aBlueHen.spawn();
    bBlueHen.setTeamColor(bTeamColor);

    const bBlueHen2: Piece = bBlueHen.spawn();
    const bMinion: Piece = aMinion.spawn();

    bMinion.setTeamColor(bTeamColor);
    const bMinion2: Piece = bMinion.spawn();

    const bPieces: Piece[] = [bBlueHen, bMinion, bBlueHen2, bMinion2];
    const myTeamA: Team = new Team(aTeamColor, aPieces);
    const myTeamB: Team = new Team(bTeamColor, bPieces);

    test("(2 pts) Team constructor - getters", () => {
        expect(myTeamA.getTeamColor()).toEqual(aTeamColor);
        expect(myTeamA.getPieces().length).toEqual(2);
        expect(myTeamA.getPieces()).toBe(aPieces);
        // pieces in the array should be
        //[aBlueHen, aMinion]
        expect(myTeamA.getPieces()[0]).toBe(aBlueHen);
        expect(myTeamA.getPieces()[1]).toBe(aMinion);

        expect(myTeamB.getTeamColor()).toEqual(bTeamColor);
        expect(myTeamB.getPieces().length).toEqual(4);
        expect(myTeamB.getPieces()).toBe(bPieces);
        // pieces int the array should be
        //[bBlueHen, bMinion, bBlueHen2, bMinion2];
        expect(myTeamB.getPieces()[0]).toBe(bBlueHen);
        expect(myTeamB.getPieces()[1]).toBe(bMinion);
        expect(myTeamB.getPieces()[2]).toBe(bBlueHen2);
        expect(myTeamB.getPieces()[3]).toBe(bMinion2);
    });

    test("(2 pts) Team removePiece", () => {
        // Team B array
        //[bBlueHen, bMinion, bBlueHen2, bMinion2];
        expect(myTeamB.getPieces().length).toEqual(4);

        // Remove the piece from middle
        myTeamB.removePieceFromTeam(bMinion);
        expect(myTeamB.getPieces().length).toEqual(3);

        // pieces left should be
        //[bBlueHen, bBlueHen2, bMinion2];
        expect(myTeamB.getPieces()[0]).toBe(bBlueHen);
        expect(myTeamB.getPieces()[1]).toBe(bBlueHen2);
        expect(myTeamB.getPieces()[2]).toBe(bMinion2);

        // removed from front
        myTeamB.removePieceFromTeam(bBlueHen);
        expect(myTeamB.getPieces().length).toEqual(2);

        // pieces left should be
        //[ bBlueHen2, bMinion2]
        expect(myTeamB.getPieces()[0]).toBe(bBlueHen2);
        expect(myTeamB.getPieces()[1]).toBe(bMinion2);

        // removed from end
        myTeamB.removePieceFromTeam(bMinion2);
        expect(myTeamB.getPieces().length).toEqual(1);

        // pieces left should be
        //[bBlueHen2]
        expect(myTeamB.getPieces()[0]).toBe(bBlueHen2);
    });

    test("(2 pts) Team addPieceToTeam", () => {
        //[aBlueHen,  aMinion]
        expect(myTeamA.getPieces().length).toEqual(2);
        // add a piece that was on Blue Team to Team A
        myTeamA.addPieceToTeam(bBlueHen);
        expect(myTeamA.getPieces().length).toEqual(3);

        expect(myTeamA.getPieces()[0]).toBe(aBlueHen);
        expect(myTeamA.getPieces()[1]).toBe(aMinion);
        expect(myTeamA.getPieces()[2]).toBe(bBlueHen);
        // color of this piece should have changed to teamAColor
        expect(myTeamA.getPieces()[2].getTeamColor()).toEqual(aTeamColor);
        expect(bBlueHen.getTeamColor()).toEqual(aTeamColor);
    });
});
