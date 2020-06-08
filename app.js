/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying;

// scores = [0,0]; //score of both players
// roundScore = 0; //score that appears when the die is rolled so it appears only once
// activePlayer = 0; //0 is 1st player, 1 is 2nd player, easy to access scored of both players 

//By DRY rule we move the above initialization to init function
init();

//dice = Math.floor(Math.random()*6) +1;// random numbers are generated between 0 to 1. To get nos. between 1 and 6, we multiple by 6 and add 1 (add 1 otherwise we will get 0 to 5)
// console.log(dice);


//object that will give us access to DOM is the document object
//There are couple of methods used to select elements from our webpage
//Here we use
//document.querySelector('#current-'+activePlayer).textContent = dice;
//How does it work?
// Easy to use, let's us select elements just like we do in css. But it only selects 1st element
//textContent method to set plain text and not HTML element of the 1st selected element // SETTER


//use innerHTML method to change HTML content
// document.querySelector('#current-'+activePlayer).innerHTML = '<em>' + dice + '</em>';

//To read content from HTML element // GETTER
//var x = document.querySelector('#score-0').textContent;
//console.log(x);

//Changing css property (moved to init function)
//document.querySelector('.dice').style.display = 'none';

//btn-roll on click function
// function btn(){

// }

//Event on buttom
// document.querySelector('.btn-roll').addEventLister('click',btn); // this btn function is written in such a way because it is a callback function, ie the function is not being called by us, but anothor function
// CALLBACKFUNCTION - Function which we pass as an argument to a certain function, and that certain function will call the argument function

//set element using document.getElementBYId to set score to 0
// document.getElementById('score-0').textContent = '0'; //getElementById is faster than querySelector
// document.getElementById('score-1').textContent = '0'; //We don't need to use # as it is secifically for Id only
// document.getElementById('current-0').textContent = '0';
// document.getElementById('current-1').textContent = '0';

//Even these initialization to init function


//Anonymous function - one time use function -- view hoisting
//Creating event listener for btn-roll for click, and adding function
document.querySelector('.btn-roll').addEventListener('click',function()
{
	if(gamePlaying)
	{
	//1.Random number
	var dice = Math.floor(Math.random()*6) +1;

	//2. Display the result
	var diceDOM = document.querySelector('.dice'); //store your selected element in a varaiable
	diceDOM.style.display = 'block';
	diceDOM.src = 'dice-' + dice + '.png'; //take the HTML attribute of img tag as it is. 


	//3. Update the roundScore, If rolled number was NOT 1
	if (dice !== 1)
	{
		//Add Score
		roundScore += dice;
		document.querySelector('#current-'+activePlayer).textContent = roundScore;
	}
	else
	{
		//Next Player and set round score to 0
		// document.querySelector('#current-'+activePlayer).textContent = 0;
		// roundScore = 0;
		// //Change the active class according to activePlayer
		// //document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
		// // The classList property returns the class name(s) of an element, as a DOMTokenList object.
		// // This property is useful to add, remove and toggle CSS classes on an element.
		// // The classList property is read-only, however, you can modify it by using the add() and remove() methods.

		// activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
		
		//document.querySelector('.player-'+activePlayer+'-panel').classList.add('active'); 

		//instead of add and remove you canuse 
		// document.querySelector('.player-0-panel').classList.toggle('active');
		// document.querySelector('.player-1-panel').classList.toggle('active');

		// //hide the dice again
		// document.querySelector('.dice').style.display = 'none';

		nextPlayer();
	}
	
	}
});

document.querySelector('.btn-hold').addEventListener('click',function()
{
	if (gamePlaying){
	//1. Add roundScore to player's Global score
	scores[activePlayer] += roundScore;

	//2. Update the UI
	document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

	//3. Check if Player Won the game
	if (scores[activePlayer] >= 10)
	{
		//change winner player's panel
		document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');

		//Set player id as winner, dice to none and state variable to false
		document.querySelector('#name-'+activePlayer).textContent = 'Winner!';
		document.querySelector('.dice').style.display = 'none';
		gamePlaying = false;
	}
	else{
		//4. Next Player
		nextPlayer();	
	}
	}
});


function nextPlayer(){
	//Next Player and set round score to 0
	document.querySelector('#current-'+activePlayer).textContent = 0;
	roundScore = 0;

	//change activePlayer
	activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
		
	//instead of add and remove you canuse 
	document.querySelector('.player-0-panel').classList.toggle('active');
	document.querySelector('.player-1-panel').classList.toggle('active');

	//hide the dice again
	document.querySelector('.dice').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click',init);

function init()
{
	scores = [0,0];
	activePlayer = 0;
	roundScore = 0;
	gamePlaying = True; 
	document.getElementById('score-0').textContent = '0'; 
	document.getElementById('score-1').textContent = '0'; 
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';
	document.querySelector('.dice').style.display = 'none';
	document.getElementById('name-0').textContent = 'Player 1';
	document.getElementById('name-1').textContent = 'Player 1';
	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');
	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');
	document.querySelector('.player-0-panel').classList.add('active');

}












