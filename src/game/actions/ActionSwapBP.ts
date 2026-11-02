/*Problem 2

ActionSwap represents an action the player can make where the start
piece swaps their backpack with the backpack of an opponents piece
on the end square. The original backpack of the piece doing the swapping
has it's swap ability expire. The newly acquired backpack of the piece
doing the swapping has all of its abilities set to available.

2.1 Define a class named ActionSwapBP that extends Action.

- Define the constructor with ONLY the game, start and end location parameters.
   Constructor should call the super's constructor with the arguments
   set to meet a swap backpack's requirements.
   Note: the second argument for the super class call should be the ActionType. 
   We don't need this value passed to our constructor because it will
   always represent a SwapBP Action. 


2.2 Implement method performAction. This method will carry out the
    swap backpack action on the GameBoard. 

    First - check that this is a valid action the player can make.
    If the action is not valid - throw an ActionError and pass:
        - the Game's message (this was set in the validAction method)
        - the appropriate ActionType.

    If the action is valid - implement the logic to reflect a backpack swap
    was made in the game.   
    On a swap backpack: 
    - the Piece on the End Square and the Piece on the Start square swap backpacks
    - the Start Piece's newly acquired backpack has all its abilites set to available
    - update the action for the Piece doing the swapping - note the only ability in the
        start piece's original backpack that gets modified is the 'swap' ability 
        which should now be expired. 
        Be careful of the order in which you call your methods!
    - one of the Pieces speaks 
    - the turn of the game is changed to the other player

    Note: Use  your UML diagram to take advantage of the methods you 
    already created in Part A! This method should not require a lot of coding
    other than to call methods you've already written. 

    Test your ActionSwapBP with ActionSwapBPtest.ts 
    View the output of the gameboard to see a piece swap its backpack

*/
/*
import { Game } from "../elements/Game";
import { BoardLocation } from "../elements/Utilities";
import { Piece } from "../elements/Piece";

import { Action } from "./Action";
import { ActionType } from "../elements/Utilities";
import { ActionError } from "../../ActionError";
*/
