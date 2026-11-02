/*Problem 8:  This class will be graded manually by the TAs

This class is the main driver of the game. It will interact with
the game elements, actions and the web page to capture user input.

8.1 Define a class named Controller. 

It should have one member field:
- member field to represent the game - GameF26 object

8.2 Define a constructor with five parameters:
    - number of rows for the gameboard
    - number of columns for the gameboard
    - color of TeamA
    - color of TeamB
    - max number of abilities for the backpacks
The constructor will create an instance of a GameF26
and assigns it to the game member field
    

8.3 Acccessor method:
    - getGame 

8.4 An accessor method getTurn 
    has no parameters and returns a string indicating the Team whose turn it is.
    Format is not being tested but it should be similar to:
    "It is blue team's turn.

8.5 A method carryOutAction that attempts to take the action selected by the user. 
It returns a boolean based on whether it successfully performed the action.
This method has three parameters in this order:
        - an ActionType to represent the Action the player wants to make
        - a start square location
        - an end square location
    - this method should create an instance of the appropriate action based on action type:      
    
        ActionType.Move -> ActionMove
        ActionType.Spawn -> ActionSpawn        
        ActionType.Attack -> ActionAttack
        ActionType.Recruit -> ActionRecruit        
        ActionType.Swap -> ActionSwapBP
        ActionType.Renew -> ActionRenew

    This methos should use TRY / CATCH  to try calling the perform action 
    method of the Action instance
    If it throws an error - this method should catch it 
    and log the error to the console and return false

    Otherwise this method should return true 

Once you have finished this method, you should be able to use: 
    npm run start 
to play your game with a text based interface.
Play your game to check if it is behaving as described in class.

*/

/*
import { GameF26 } from "./elements/GameF26";
import { Action } from "./actions/Action";
import { ActionMove } from "./actions/ActionMove";
import { ActionAttack } from "./actions/ActionAttack";
import { ActionSpawn } from "./actions/ActionSpawn";
import { ActionRecruit } from "./actions/ActionRecruit";
import { BoardLocation } from "./elements/Utilities";
import { ActionType } from "./elements/Utilities";
import { ActionRenew } from "./actions/ActionRenew";
import { ActionSwapBP } from "./actions/ActionSwapBP";
import { ActionError } from "../ActionError";
*/
