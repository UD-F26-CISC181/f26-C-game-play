import { Piece } from "../src/game/elements/Piece";
import { PieceBlueHen } from "../src/game/elements/PieceBlueHen";
import { BoardSquare } from "../src/game/elements/BoardSquare";
import { GameBoard } from "../src/game/elements/GameBoard";
import { BoardLocation } from "../src/game/elements//Utilities";
import { Ability } from "../src/game/elements/Ability";
import { Backpack } from "../src/game/elements/Backpack";
import { ActionType } from "../src/game/elements/Utilities";
import { PieceMinion } from "../src/game/elements/PieceMinion";

describe("GameBoard - ", () => {
    const myGameBoard: GameBoard = new GameBoard(6, 8);
    const myGameBoard1: GameBoard = new GameBoard(2, 2);
    const myGameBoard2: GameBoard = new GameBoard(2, 2);
    const cornerLocation: BoardLocation = new BoardLocation(0, 0);
    const myCornerSquare: BoardSquare = myGameBoard1.getSquare(cornerLocation);

    const aBackpack: Backpack = new Backpack([
        new Ability(ActionType.Spawn, false),
    ]);
    const bBackpack: Backpack = new Backpack([
        new Ability(ActionType.Renew, false),
    ]);
    const aBlueHen: PieceBlueHen = new PieceBlueHen(
        "H",
        "Red",
        true,
        aBackpack,
    );
    const bBlueHen: PieceBlueHen = new PieceBlueHen(
        "H",
        "Red",
        true,
        bBackpack,
    );

    const aMinion: PieceMinion = new PieceMinion(
        "M",
        "Red",
        true,
        aBackpack.clone(),
    );
    const bMinion: PieceMinion = new PieceMinion(
        "M",
        "Red",
        true,
        bBackpack.clone(),
    );

    test("(3 pts) GameBoard - constructor and setUpEmptyBoard", () => {
        // check the 2D array dimensions

        expect(myGameBoard.getNumRows()).toEqual(6);
        expect(myGameBoard.getNumColumns()).toEqual(8);
        expect(myGameBoard.getAllSquares().length).toBe(6);
        expect(myGameBoard.getAllSquares()[0].length).toBe(8);
        // check color of some squares
        expect(myGameBoard.getAllSquares()[0][0].getSquareColor()).toBe(
            "black",
        );
        expect(myGameBoard.getSquare(cornerLocation).getSquareColor()).toBe(
            "black",
        );
        expect(myGameBoard.getAllSquares()[1][0].getSquareColor()).toBe(
            "white",
        );
        expect(myGameBoard.getAllSquares()[5][0].getSquareColor()).toBe(
            "white",
        );
        expect(myGameBoard.getAllSquares()[5][7].getSquareColor()).toBe(
            "black",
        );
    });

    test("(1 pts) GameBoard - getAllSquares", () => {
        expect(myGameBoard.getAllSquares()[0][0]).toBe(
            myGameBoard.getSquare(cornerLocation),
        );
    });

    test("(1 pts) GameBoard - inBounds", () => {
        // check the 2D array dimensions
        expect(myGameBoard.inBounds(new BoardLocation(-1, 0))).toBe(false);
        expect(myGameBoard.inBounds(new BoardLocation(5, -1))).toBe(false);
        expect(myGameBoard.inBounds(new BoardLocation(6, 2))).toBe(false);
        expect(myGameBoard.inBounds(new BoardLocation(6, 8))).toBe(false);
        expect(myGameBoard.inBounds(new BoardLocation(5, 7))).toBe(true);
        expect(myGameBoard.inBounds(new BoardLocation(0, 0))).toBe(true);
        expect(myGameBoard.inBounds(new BoardLocation(3, 5))).toBe(true);
    });

    test("(1 pts) GameBoard - isBoardFull", () => {
        // Set pieces on the board and check if full
        // This board has only 4 BoardSquares
        myGameBoard1.getAllSquares()[0][0].setPiece(aBlueHen);
        myGameBoard1.getAllSquares()[0][1].setPiece(bBlueHen);
        expect(myGameBoard1.isBoardFull()).toBe(false);
        myGameBoard1.getAllSquares()[1][0].setPiece(aMinion);
        expect(myGameBoard1.isBoardFull()).toBe(false);
        myGameBoard1.getAllSquares()[1][1].setPiece(bMinion);
        expect(myGameBoard1.isBoardFull()).toBe(true);
    });

    test("(1 pts) GameBoard - Can removePiece", () => {
        // Remove the piece on the square
        let aPiece: Piece | null = myCornerSquare.removePiece();
        // Square should be empty
        expect(myCornerSquare.isEmpty()).toEqual(true);
        expect(aPiece).toBeInstanceOf(Piece);
        expect(aPiece).toBeInstanceOf(PieceBlueHen);
        expect(aPiece).toBe(aBlueHen);
        expect(myCornerSquare.getPiece()).toBeNull();
    });

    test("(3 pts) GameBoard - findRandomEmptySquare", () => {
        // This board has only 4 BoardSquares

        // Set 2 pieces on the board and check if full
        myGameBoard2.getAllSquares()[0][0].setPiece(aBlueHen);
        myGameBoard2.getAllSquares()[1][1].setPiece(bMinion);
        // Finding an empty square
        let anEmptySquare: BoardSquare = myGameBoard2.findRandomEmptySquare();
        expect(anEmptySquare).toBeInstanceOf(BoardSquare);
        expect(anEmptySquare.isEmpty()).toBe(true);
        // set a piece on the emptySquare
        anEmptySquare.setPiece(aMinion);
        // Finding last empty square
        anEmptySquare = myGameBoard2.findRandomEmptySquare();
        // set a piece on the emptySquare
        anEmptySquare.setPiece(bBlueHen);
        // Board should be full now
        expect(myGameBoard2.isBoardFull()).toBe(true);
    });
});
