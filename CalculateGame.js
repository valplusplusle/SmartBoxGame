var boxstatus = new Array(25); // status array (clicked or not)
var boxAttribute = new Array(25); // Attributes for each box
var boxesClicked = 0 // counter how many boxes already clicked
var boxCounter = Math.floor(Math.random() * 10) + 7; //random number for the number of boxes you have to click
var score = 0; //just the score
var finalScore = 0; //to Save for the final view because normal score delets his self

var listleft = [0, 5, 10, 15, 20]; //all the box id's wich are on the left side
var listright = [4, 9, 14, 19, 24]; //all the box id's wich are on the right side
var nextScore = 5; //points you get for boxes next to other ones
var crossScore = 5; //points you get for boxes across to other ones

//function to initialize the game page
$(document).ready(function()
{
	boxid = 0
  	for(y = 0; y < 25; y++) 
  	{
  		boxAttribute[boxid] = Math.floor(Math.random() * 21) - 10;
		var box = document.createElement("DIV");
		box.setAttribute("id", boxid);
		box.setAttribute("class", "box");
		box.setAttribute("onclick", "changeboxstatus("+boxid+")");
		document.getElementById("game").appendChild(box);
		box.innerHTML = boxAttribute[boxid];
		boxstatus[boxid] = 0;
		boxid = boxid + 1;
	}
	document.getElementById('counter').innerHTML = (boxCounter);
});

//function to calculate the current score
function calculateScore()
{
	for (x=0; x<boxstatus.length; x++)
	{
		if (boxstatus[x] == 1)
		{
			score = score + boxAttribute[x];
			if (x in listleft || x in listright)
			{
				if (x in listleft)
				{
					if (boxstatus[x+1] === 1) {score = score + nextScore}
					if (boxstatus[x+5] === 1) {score = score + nextScore}
					if (boxstatus[x-5] === 1) {score = score + nextScore}
					if (boxstatus[x-4] === 1) {score = score - crossScore}
					if (boxstatus[x+6] === 1) {score = score - crossScore}
				}
				else
				{
					if (boxstatus[x-1] === 1) {score = score + nextScore}
					if (boxstatus[x+5] === 1) {score = score + nextScore}
					if (boxstatus[x-5] === 1) {score = score + nextScore}	
					if (boxstatus[x+4] === 1) {score = score - crossScore}
					if (boxstatus[x-6] === 1) {score = score - crossScore}
				}
			}
			else
			{
				if (boxstatus[x+1] === 1) {score = score + nextScore}
				if (boxstatus[x-1] === 1) {score = score + nextScore}
				if (boxstatus[x+5] === 1) {score = score + nextScore}
				if (boxstatus[x-5] === 1) {score = score + nextScore}
				if (boxstatus[x+4] === 1) {score = score - crossScore}
				if (boxstatus[x+6] === 1) {score = score - crossScore}
				if (boxstatus[x-4] === 1) {score = score - crossScore}
				if (boxstatus[x-6] === 1) {score = score - crossScore}
			}
		}
	}
	showScore();
	finalScore = score;
	score = 0;
}

//function to change the status of a box (when it is clicked)
function changeboxstatus(boxidclicked)
{
	if(boxstatus[boxidclicked] === 0)
	{
		boxstatus[boxidclicked] = 1;
		calculateScore();
		document.getElementById(boxidclicked.toString()).setAttribute("class", "box boxclicked");
		boxesClicked = boxesClicked + 1;
		if ( boxCounter == boxesClicked)
		{
			gameOver();
		}
		document.getElementById('counter').innerHTML = (boxCounter-boxesClicked);
	}
}

//show the current score on Page
function showScore()
{
	document.getElementById('score').innerHTML = (score);
}

//Info when the game is done
function gameOver()
{
	document.getElementById("game").remove();
	document.getElementById('gameOver').innerHTML = ("<h4 class='alert-heading'>Well done!</h4> <p>Aww yeah, you successfully made it!</p> <hr> <p class='mb-0'>SCORE:</p>" + finalScore + "<hr> <a href='calculate.html'><p class='mb-0'>play again? ⟲</p></a>");
	document.getElementById('gameOver').setAttribute("class", "gameOverBox alert alert-success");
}
