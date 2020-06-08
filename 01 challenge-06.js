/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/

var scores, roundScore, activePlayer, gamePlaying, temp_1, temp_2, finalScore, winningScore;

init();
//Anonymous function - one time use function -- view hoisting
//Creating event listener for btn-roll for click, and adding function
document.querySelector('.btn-roll').addEventListener('click',function()
{
	if(gamePlaying)
	{
	//1.Random number
	var dice_1 = Math.floor(Math.random()*6) +1;
	var dice_2 = Math.floor(Math.random()*6) +1;


	//2. Display the result of dice
	var diceDOM_1 = document.getElementById('dice-1'); //store your selected element in a varaiable
	diceDOM_1.style.display = 'block';
	diceDOM_1.src = 'dice-' + dice_1 + '.png'; //take the HTML attribute of img tag as it is. 

	var diceDOM_2 = document.getElementById('dice-2'); //store your selected element in a varaiable
	diceDOM_2.style.display = 'block';
	diceDOM_2.src = 'dice-' + dice_2 + '.png'; //take the HTML attribute of img tag as it is. 

	//3. Update the roundScore, If rolled number was NOT 1
	if (dice_1 === 1 || dice_2 === 1)
	{
		nextPlayer();
	}
	else if((dice_1 === 6 || dice_2 === 6) && (temp_1 === 6 || temp_2 ===6))
	{
		scores[activePlayer] = 0;
		document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
		nextPlayer();
	}
	else
	{	
		//Add Score
		roundScore += (dice_1 + dice_2);
		document.querySelector('#current-'+activePlayer).textContent = roundScore;
		
	}

	//4. storing copy dice number for step - 3 (rule 1)
	temp_1 = dice_1;
	temp_2 = dice_2;
	
	}
});

document.querySelector('.btn-hold').addEventListener('click',function()
{
	if (gamePlaying){
	//1. Add roundScore to player's Global score
	scores[activePlayer] += roundScore;

	finalScore = document.querySelector('.final-score').value;
	
	//undefined, 0, null or " " are coerced to false
	//anything else is coerced to true
	if(finalScore){
		winningScore = finalScore;
	}
	else{
		winningScore = 100;
	}

	//2. Update the UI
	document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

	//3. Check if Player Won the game
	if (scores[activePlayer] >= winningScore)
	{
		//change winner player's panel
		document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');

		//Set player id as winner, dice to none and state variable to false
		document.querySelector('#name-'+activePlayer).textContent = 'Winner!';
		document.getElementById('dice-1').style.display = 'none';
		document.getElementById('dice-2').style.display = 'none';
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
	document.querySelector('#dice-2').style.display = 'none';
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
	document.querySelector('#dice-2').style.display = 'none';

	document.getElementById('name-0').textContent = 'Player 1';
	document.getElementById('name-1').textContent = 'Player 2';

	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');
	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');
	document.querySelector('.player-0-panel').classList.add('active');

}












