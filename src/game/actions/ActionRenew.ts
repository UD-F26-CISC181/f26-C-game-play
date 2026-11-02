/*Problem 1

ActionRenew represents an action the player can make where the start
piece selects another piece on its OWN team to renew all the
abilities in that piece's backpack. 

1.1 Define a class named ActionRenew that extends Action

- Define the constructor with ONLY the game, start and end location parameters.
   Constructor should call the super's constructor with the arguments
   set to meet a renew's requirements.
   Note: the second argument for the super class call should be the ActionType. 
   We don't need this value passed to our constructor because it will
   always represent a Renew. 
   

1.2 Implement method performAction. This method will carry out the
    renew action on the GameBoard. 

    First - check that this is a valid action the player can make.
    If the action is not valid - throw an ActionError and pass:
        - the Game's message (this was set in the validAction method)
        - the appropriate ActionType.

    If the action is valid - implement the logic to reflect a renew was made in the 
    game. 
    On a renew:
        - all the abilities in the backpack of the End Square's piece are
            set to available
        - update the action for the Piece on start square
        - one of the Pieces being speaks
        - the turn of the game is changed to the other player

    Note: Use  your UML diagram to take advantage of the methods you 
    already created in Part A! This method should not require a lot of coding
    other than to call methods you've already written. 

    Test your ActionRenew with ActionRenew.test.ts 
    View the output of the gameboard to see a piece's backpack renewed
*/
/*
import { Game } from "../elements/Game";
import { ActionType } from "../elements/Utilities";
import { BoardLocation } from "../elements/Utilities";
import { Piece } from "../elements/Piece";
import { Action } from "./Action";
import { ActionError } from "../../ActionError";
*/


