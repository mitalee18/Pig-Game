/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying;
document.querySelector('#dice-2').style.display = 'none';
document.querySelector('.final-score').style.display = 'none';

alert('Game Rules \n - The game has 2 players, playing in rounds \n - In each turn, a player rolls a dice as many times as he wishes. Each result get added to his ROUND score\n - BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it\'s the next player\'s turn\n - The player can choose to \'Hold\', which means that his ROUND score gets added to his GLOBAL score. After that, it\'s the next player\'s turn\n - The first player to reach 100 points on GLOBAL score wins the game');

//By DRY rule we move the above initialization to init function
init();

//Creating event listener for btn-roll for click, and adding function
document.querySelector('.btn-roll').addEventListener('click',function()
{
	if(gamePlaying)
	{
	//1.Random number
	var dice = Math.floor(Math.random()*6) +1;

	//2. Display the result
	var diceDOM = document.querySelector('#dice-1'); //store your selected element in a varaiable
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
	if (scores[activePlayer] >= 100)
	{
		//change winner player's panel
		document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');

		//Set player id as winner, dice to none and state variable to false
		document.querySelector('#name-'+activePlayer).textContent = 'Winner!';
		document.querySelector('#dice-1').style.display = 'none';
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
	document.querySelector('#dice-1').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click',init);

function init()
{
	scores = [0,0];
	activePlayer = 0;
	roundScore = 0;
	gamePlaying = true; 
	document.getElementById('score-0').textContent = '0'; 
	document.getElementById('score-1').textContent = '0'; 
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';
	document.querySelector('#dice-1').style.display = 'none';
	document.getElementById('name-0').textContent = 'Player 1';
	document.getElementById('name-1').textContent = 'Player 1';
	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');
	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');
	document.querySelector('.player-0-panel').classList.add('active');

}












