/* Problem 4

ActionRecruit represents an action the player can make where the start
piece recruits an opponents piece on the end square. The recruited piece 
is removed from the opponents team and added to the current player's team.
Both pieces stay on the same squares and are still active.

4.1 Define a class named ActionRecruit that extends Action

- Define the constructor with ONLY the game, start and end location parameters.
   Constructor should call the super's constructor with the arguments
   set to meet an recruit's requirements.
   Note: the second argument for the super class call should be the ActionType. 
   We don't need this value passed to our constructor because it will
   always represent Recruit Action.

4.2 Implement method performAction. This method will carry out the
    recruit action on the GameBoard. 

    First - check that this is a valid action the player can make.
    If the action is not valid - throw an ActionError and pass:
        - the Game's message (this was set in the validAction method)
        - the appropriate ActionType.

    If the action is valid - implement the logic to reflect a recruit was made in the 
    game. 
    On a recruit: 
    - the Piece on the End Square is removed from the opponent's team
    - the Piece on the End Square is added to the current player's team
    - the Piece being recruited speaks
    - update the action for the Piece doing the recruiting
    - the turn of the game is changed to the other player

    Note: Use  your UML diagram to take advantage of the methods you 
    already created in Part A! This method should not require a lot of coding
    other than to call methods you've already written. 

    Test your ActionRecruit with ActionRecruit.test.ts 
    View the output of the gameboard to see a piece recruit

*/
/*
import { Game } from "../elements/Game";
import { ActionType } from "../elements/Utilities";
import { BoardLocation } from "../elements/Utilities";
import { Piece } from "../elements/Piece";
import { ActionError } from "../../ActionError";
import { Action } from "./Action";
import { PieceEvilMinion } from "../elements/PieceEvilMinion";
import { BoardSquare } from "../elements/BoardSquare";
*/
