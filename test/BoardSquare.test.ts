import { Ability } from "../src/game/elements/Ability";
import { Backpack } from "../src/game/elements/Backpack";
import { BoardSquare } from "../src/game/elements/BoardSquare";
import { Piece } from "../src/game/elements/Piece";
import { PieceBlueHen } from "../src/game/elements/PieceBlueHen";
import { ActionType } from "../src/game/elements/Utilities";

describe("BoardSquare", () => {
    const myBoardSquare: BoardSquare = new BoardSquare("black");
    const aBackpack: Backpack = new Backpack([
        new Ability(ActionType.Spawn, false),
    ]);
    const aBlueHen: PieceBlueHen = new PieceBlueHen(
        "H",
        "Red",
        true,
        aBackpack,
    );

    test("(1 pts)  BoardSquare constructor - getters", () => {
        expect(myBoardSquare.getSquareColor()).toEqual("black");
        expect(myBoardSquare.isEmpty()).toEqual(true);
        expect(myBoardSquare.getPiece()).toBeNull();
    });

    test("(1 pts) Can setPiece", () => {
        // Set a piece on the square
        myBoardSquare.setPiece(aBlueHen);
        // Square should no longer be empty
        expect(myBoardSquare.isEmpty()).toEqual(false);
        expect(myBoardSquare.getPiece()).toBeInstanceOf(Piece);
        expect(myBoardSquare.getPiece()).toBeInstanceOf(PieceBlueHen);
        expect(myBoardSquare.getPiece()).toBe(aBlueHen);
    });

    test("(1 pts) Can removePiece", () => {
        // Remove the piece on the square
        let aPiece: Piece | null = myBoardSquare.removePiece();
        // Square should be empty
        expect(myBoardSquare.isEmpty()).toEqual(true);
        expect(aPiece).toBeInstanceOf(Piece);
        expect(aPiece).toBeInstanceOf(PieceBlueHen);
        expect(aPiece).toBe(aBlueHen);
        expect(myBoardSquare.getPiece()).toBeNull();
    });

    test("(1 pts) toString ", () => {
        expect(myBoardSquare.toString()).toEqual("-------");
        // Set a piece on the square
        myBoardSquare.setPiece(aBlueHen);
        expect(myBoardSquare.toString()).toEqual("-Red H-");
    });
});
