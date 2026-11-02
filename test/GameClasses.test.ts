import { Game } from "../src/game/elements/Game";
import { GameF26 } from "../src/game/elements/GameF26";
import { TestGame } from "./TestGame";

describe("GameF26", () => {
    test("(1 pts)  GameF26 hierarchy", () => {
        let game: Game = new GameF26(6, 8, "Blue", "Red", 3);
        expect(game instanceof Game).toEqual(true);
        expect(game instanceof GameF26).toEqual(true);
    });

    test("(4 pts)  GameF26 constructor", () => {
        const testGame: TestGame = new TestGame();
        const teamAColor: string = testGame.teamA.getTeamColor();
        const teamBColor: string = testGame.teamB.getTeamColor();
        // Team A starts
        expect(testGame.game.isTurn(testGame.teamA)).toEqual(true);
        expect(testGame.game.isTurn(testGame.teamB)).toEqual(false);
        expect(testGame.game.getCurrentTeam().getTeamColor()).toEqual(
            teamAColor,
        );
        expect(testGame.game.getOpponentTeam().getTeamColor()).toEqual(
            teamBColor,
        );
    });

    test("(3 pts)  GameF26 initializeGameBoard", () => {
        const testGame: TestGame = new TestGame();
        // test that all pieces placed on the board

        // set up boolean flags for each piece that should be on the board
        let aHenFound: boolean = false;
        let bHenFound: boolean = false;
        let aMinionFound: boolean = false;
        let bMinionFound: boolean = false;
        let count: number = 0;

        // Look for all the pieces that should be on the board
        for (let row of testGame.game.getGameBoard().getAllSquares()) {
            for (let square of row) {
                if (square.getPiece() === testGame.aBlueHen) {
                    aHenFound = true;
                    count++;
                } else if (square.getPiece() === testGame.bBlueHen) {
                    bHenFound = true;
                    count++;
                } else if (square.getPiece() === testGame.aMinion) {
                    aMinionFound = true;
                    count++;
                } else if (square.getPiece() === testGame.bMinion) {
                    bMinionFound = true;
                    count++;
                }
            }
        }
        // Each Piece should be found
        expect(aHenFound).toEqual(true);
        expect(aMinionFound).toEqual(true);
        expect(bHenFound).toEqual(true);
        expect(bMinionFound).toEqual(true);
        // Each piece should only be on the board once
        expect(count).toEqual(4);
    });

    test("(2 pts)  GameF26 changeTurn", () => {
        const testGame: TestGame = new TestGame();
        const teamAColor: string = testGame.teamA.getTeamColor();
        const teamBColor: string = testGame.teamB.getTeamColor();
        // Team A starts
        expect(testGame.game.isTurn(testGame.teamA)).toEqual(true);
        // change the turn
        testGame.game.changeTurn();
        expect(testGame.game.isTurn(testGame.teamA)).toEqual(false);
        expect(testGame.game.isTurn(testGame.teamB)).toEqual(true);
        expect(testGame.game.getCurrentTeam().getTeamColor()).toEqual(
            teamBColor,
        );
        expect(testGame.game.getOpponentTeam().getTeamColor()).toEqual(
            teamAColor,
        );

        // Team B turn
        expect(testGame.game.isTurn(testGame.teamB)).toEqual(true);
        // change the turn
        testGame.game.changeTurn();
        expect(testGame.game.isTurn(testGame.teamA)).toEqual(true);
        expect(testGame.game.isTurn(testGame.teamB)).toEqual(false);
        expect(testGame.game.getCurrentTeam()).toBe(testGame.teamA);
        expect(testGame.game.getOpponentTeam()).toBe(testGame.teamB);
    });

    test("(2 pts)  GameF26 game ended and get winner", () => {
        // test a Game where B wins
        let gameB: TestGame = new TestGame();
        gameB.removeAllPiecesFromTeam(gameB.teamA);

        expect(gameB.game.isGameEnded()).toEqual(true);
        // A has no pieces so B should win
        expect(gameB.game.getWinner()).toBe(gameB.teamB);

        // test a Game where A wins
        let gameA: TestGame = new TestGame();
        gameA.removeAllPiecesFromTeam(gameA.teamB);

        expect(gameA.game.isGameEnded()).toEqual(true);
        // B has no pieces so A should win
        expect(gameA.game.getWinner()).toBe(gameA.teamA);
    });
});
