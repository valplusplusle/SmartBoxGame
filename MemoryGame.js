var boxstatus = new Array(25); // status array (clicked or not)
var boxAttribute = new Array(25); // Attributes for each box is it on or not
var boxesClicked = 0; // counter how many boxes already clicked
var boxCounter = 0;
var score = 0; //just the score
var waitForTimer = 0;

//function to initialize the game page
$(document).ready(function()
{
	boxid = 0
  	for(y = 0; y < 25; y++) 
  	{
  		boxAttribute[boxid] = Math.floor(Math.random() * 2);
  		if(boxAttribute[boxid] === 1)
  		{
  			boxCounter = boxCounter +1;
  		}
		var box = document.createElement("DIV");
		box.setAttribute("id", boxid);
		combinedString= "box " + "status" + boxAttribute[boxid];
		box.setAttribute("class", combinedString);
		box.setAttribute("onclick", "changeboxstatus("+boxid+")");
		document.getElementById("game").appendChild(box);
		boxstatus[boxid] = 0;
		boxid = boxid + 1;
	}
	timer();
});


function timer()
{
	var timeLeft = 5;
    var elem = document.getElementById('time');
    var timerId = setInterval(countdown, 1000);
    function countdown() {
      if (timeLeft === 0) {
        clearTimeout(timerId);
        waitForTimer = 1;
        deleteClass();
      } else {
        elem.innerHTML = timeLeft;
        timeLeft--;
      }
    }
}


//function to change the status of a box (when it is clicked)
function changeboxstatus(boxidclicked)
{
	if(waitForTimer === 1)
	{
		if(boxAttribute[boxidclicked] === 1 && boxstatus[boxidclicked] === 0)
		{
			boxstatus[boxidclicked] = 1;
			score = score +1;
			showScore();
			boxesClicked = boxesClicked +1;
			document.getElementById(boxidclicked.toString()).setAttribute("class", "box boxclicked");
			if (boxesClicked == boxCounter) {gameOver()}
		}
		if (boxAttribute[boxidclicked] === 0)
		{
			score = score -5;
			showScore();
			document.getElementById(boxidclicked.toString()).setAttribute("class", "box boxclickedwrong");
		}
	}
}

//show the current score on Page
function deleteClass()
{
	for (boxes = 0; boxes <25; boxes++)
	{
	document.getElementById(boxes).setAttribute("class", "box");
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
	document.getElementById('gameOver').innerHTML = ("<h4 class='alert-heading'>Well done!</h4> <p>Aww yeah, you successfully made it!</p> <hr> <p class='mb-0'>SCORE:</p>" + score + "<hr> <a href='memory.html'><p class='mb-0'>play again? ⟲</p></a>");
	document.getElementById('gameOver').setAttribute("class", "gameOverBox alert alert-success");
}
