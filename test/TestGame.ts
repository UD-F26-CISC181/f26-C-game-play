import { Piece } from "../src/game/elements/Piece";
import { PieceBlueHen } from "../src/game/elements/PieceBlueHen";
import { PieceMinion } from "../src/game/elements/PieceMinion";
import { ActionType } from "../src/game/elements/Utilities";
import { GameF26 } from "../src/game/elements/GameF26";
import { Team } from "../src/game/elements/Team";
import { Ability } from "../src/game/elements/Ability";
import { Backpack } from "../src/game/elements/Backpack";
import { Game } from "../src/game/elements/Game";
import { GameBoard } from "../src/game/elements/GameBoard";

export class TestGame {
    public aBackpack: Backpack = new Backpack([
        new Ability(ActionType.Swap, false),
    ]);
    public bBackpack: Backpack = new Backpack([
        new Ability(ActionType.Swap, false),
    ]);
    public cBackpack: Backpack = new Backpack([]);

    public teamAColor: string = "Red";
    public teamBColor: string = "Blue";

    public aBlueHen: PieceBlueHen = new PieceBlueHen(
        "H",
        this.teamAColor,
        true,
        this.aBackpack,
    );
    public bBlueHen: PieceBlueHen = new PieceBlueHen(
        "H",
        this.teamBColor,
        true,
        this.bBackpack,
    );
    public aMinion: PieceMinion = new PieceMinion(
        "M",
        this.teamAColor,
        true,
        new Backpack([
            new Ability(ActionType.Renew, false),
            new Ability(ActionType.Spawn, false),
        ]),
    );
    public bMinion: PieceMinion = new PieceMinion(
        "M",
        this.teamBColor,
        true,
        this.cBackpack,
    );

    public aPieces: Piece[] = [this.aBlueHen, this.aMinion];
    public bPieces: Piece[] = [this.bBlueHen, this.bMinion];
    public teamA: Team;
    public teamB: Team;

    public game: Game = new GameF26(6, 8, "Red", "Blue", 3);

    public removePiecesFromBoard(gameBoard: GameBoard) {
        for (let row of gameBoard.getAllSquares()) {
            for (let col of row) {
                col.removePiece();
            }
        }
    }

    public removeAllPiecesFromTeam(team: Team) {
        while (team.getPieces().length > 0) {
            team.removePieceFromTeam(team.getPieces()[0]);
        }
    }

    constructor() {
        // remove all their pieces and load ours
        this.teamA = this.game.getCurrentTeam();
        this.teamB = this.game.getOpponentTeam();
        this.removeAllPiecesFromTeam(this.teamA);
        this.removeAllPiecesFromTeam(this.teamB);

        // load Pieces onto teams
        this.teamA.addPieceToTeam(this.aMinion);
        this.teamA.addPieceToTeam(this.aBlueHen);
        this.teamB.addPieceToTeam(this.bBlueHen);
        this.teamB.addPieceToTeam(this.bMinion);

        this.loadPieces(this.game.getGameBoard());
    }

    loadPieces(gameBoard: GameBoard) {
        this.removePiecesFromBoard(gameBoard);

        // remove all pieces
        for (let row of gameBoard.getAllSquares()) {
            for (let square of row) {
                // remove piece
                if (!square.isEmpty()) {
                    square.removePiece();
                }
            }
        }
        // load pieces in diagonal
        gameBoard.getAllSquares()[0][0].setPiece(this.aBlueHen);
        gameBoard.getAllSquares()[1][1].setPiece(this.bBlueHen);
        gameBoard.getAllSquares()[2][2].setPiece(this.aMinion);
        gameBoard.getAllSquares()[3][3].setPiece(this.bMinion);
    }
}
