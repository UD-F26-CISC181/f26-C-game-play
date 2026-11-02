/* Problem  5, 6 and 7

We are going to add a PieceEvilMinion that will represent
a purple minion character from the Despicable Me movie. 
An evil minion will be able to recruit an army. 
Each piece that is part of its army is considered a soldier.
Evil Minions can never spawn! Even if have the ability in their backpack! 

When an Evil Minion recruits a piece - it gets added to its army
When an Evil Minion is attacked or recruited by another piece - it will
sacrifice one its soliers to be attacked or recruited. If it has no army,
then it will be recruited or attacked.

Adding this new Piece will walk you through the process of how to make modifications
to your game. (For Part D - you will be adding new Pieces and Actions)

***********************************************************************
Problem 5. We need to add a new field to the Piece class to 
represent whether the Piece is a soldier. 

CHANGES TO THE ABSTRACT PIECE CLASS:

5.1 Add a member to represent whether the Piece is a soldier (boolean)
5.2 Changes to the constructor
        - do NOT modify the parameter list of constructor!
        - in the constructor body set soldier to false
5.3 Add a getter for this new field named isSoldier
5.4 Add a setter for this new field named setSoldier
5.5 Modify the toString():
    We want to be able to identify Pieces that are soldiers on our gameboard.
    We can do this by updating the toString.
    However, we don't want to break all our test cases we've built up to this point.
    An easy way to accomplish this is to put an "s"  (soldier)
    in between our color and and symbol if we have a soldier.

    "Red M"  for a Red Minion that is not a soldier
    "RedsM"  for a Red minion that is a soldier
***********************************************************************  
Problem 6.  

6.1 Create a subclass of PieceMinion named PieceEvilMinion 

An evil minion will be able to recruit an army. Each piece that is part of its
army is considered a soldier.  

This class will inherit members from PieceMinion and additionally include:

- member field of type piece array to hold its army (we will think of each piece
in the army as  a soldier) 

6.2 A constructor with the parameters required by the superclass and the army 
     - calls the super class' constructor (symbol should be set to 'E' by default)
     - adds the ActionType - Attack to its permanent abilities     
     - sets the army field to valued passed
     - ensures that all Pieces in the army are soldiers (isSoldier would return true)
     - sets the number of recruits to the Max allowed and calls update Spawn
        (this will remove it's ability to spawn)

6.3 Accessor methodd:
    - getArmy

6.4 A mutator named addToArmy with one Piece parameter and returns nothing.
This method will add the piece to the army and will set the Piece's soldier 
field to true.

6.5 An implementation for the method named speak that has no parameters
and returns the string 'Grrr!' 

6.6 A method findSoldier that had one Piece parameter and
returns the index of where the Piece is located in the army. 
If it can't be found - the method should return a -1.
NOTE: You can use a higher order method here if you read ahead to Chap 12!

6.7 A method that has one parameter of the union type Piece | null.
This method removes the piece from the army if it it in the army. The
removed Piece should have it's soldier field set to false.

*********************************************************************** 
Problem 7  Update the game to include a PieceEvilMinion for both Teams.

7.1  In your Game class' private helper function that creates a Team,
add code to create an instance of a PieceEvilMinion and add it to the team.

*********************************************************************** 
NOTE: For this assignment we will not be including the modifications that
are necessary for the ActionAttack and ActionRecruit to carry out the
recruits and attacks as we described above. Including this logic will 
make it harder to debug your game. We want to make sure you can play
your game without this complication before including it.
We will add this part in next final project assignment (Part D). 
For now Evil Minions will recruit, and be recruited and attacked like other Pieces.
***********************************************************************

Test your PieceEvilMinion with PieceEvilMinion.test.ts
*/


/*import { Backpack } from "./Backpack";
import { PieceMinion } from "./PieceMinion";
import { ActionType } from "./Utilities";
import { Ability } from "./Ability";
import { Piece } from "./Piece";
*/
