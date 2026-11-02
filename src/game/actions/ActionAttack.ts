/* Problem 3

ActionAttack represents an action the player can make where the start
piece attacks an opponents piece on the end square. The attacking piece
moves to the end square. The attacked piece is removed from the board
and set to inactive. 

3.1 Define a class named ActionAttack that extends Action.

- Define the constructor with ONLY the game, start and end location parameters.
   Constructor should call the super's constructor with the arguments
   set to meet an attack's requirements.
   Note: the second argument for the super class call should be the ActionType. 
   We don't need this value passed to our constructor because it will
   always represent an Attack Action. 
 

3.2 Implement method performAction. This method will carry out the
    attack action on the GameBoard. 

    First - check that this is a valid action the player can make.
    If the action is not valid - throw an ActionError and pass:
        - the Game's message (this was set in the validAction method)
        - the appropriate ActionType.

    If the action is valid - implement the logic to reflect an attack was made in the 
    game.   
    On an attack:
    - the Piece on the End Square is removed from the board
    - the Piece on the End Square is removed from the opponent's team
    - Piece on the Start Square is moved to the End Square
    - update the action for the Piece doing the attacking
    - one of the Pieces speaks
    - the turn of the game is changed to the other player

    Note: Use  your UML diagram to take advantage of the methods you 
    already created in Part A! This method should not require a lot of coding
    other than to call methods you've already written. 

    Test your ActionAttack with ActionAttack.test.ts 
    View the output of the gameboard to see a piece attack
*/
/*
import { Game } from "../elements/Game";
import { ActionType } from "../elements/Utilities";
import { BoardLocation } from "../elements/Utilities";
import { Piece } from "../elements/Piece";
import { Action } from "./Action";
import { ActionError } from "../../ActionError";
*/
