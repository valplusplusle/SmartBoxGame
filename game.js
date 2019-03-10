var boxstatus = new Array(25);
var boxesClicked = 0
var boxCounter = Math.floor(Math.random() * 15) + 5;
var score = 0;
var listleft = [0, 5, 10, 15, 20];
var listright = [4, 9, 14, 19, 24]; 

$(document).ready(function()
{
	boxid = 0
  	for(y = 0; y < 25; y++) 
  	{
		var box = document.createElement("DIV");
		box.setAttribute("id", boxid);
		box.setAttribute("class", "box");
		box.setAttribute("onclick", "changeboxstatus("+boxid+")");
		document.getElementById("game").appendChild(box);
		boxstatus[boxid] = 0;
		boxid = boxid + 1;
	}
	document.getElementById('counter').innerHTML = (boxCounter);
});

function calculateScore()
{
	for (x=0; x<boxstatus.length; x++)
	{
		if (boxstatus[x] == 1)
		{
			score = score + 1;
			if (x in listleft || x in listright)
			{
				if (x in listleft)
				{
					if (boxstatus[x+1] === 1) {score = score - 3}
					if (boxstatus[x+5] === 1) {score = score - 3}
					if (boxstatus[x-5] === 1) {score = score - 3}
					if (boxstatus[x-4] === 1) {score = score + 1}
					if (boxstatus[x+6] === 1) {score = score + 1}
				}
				if (x in listright)
				{
					if (boxstatus[x-1] === 1) {score = score - 3}
					if (boxstatus[x+5] === 1) {score = score - 3}
					if (boxstatus[x-5] === 1) {score = score - 3}	
					if (boxstatus[x+4] === 1) {score = score + 1}
					if (boxstatus[x-6] === 1) {score = score + 1}
				}
			}
			else
			{
				if (boxstatus[x+1] === 1) {score = score - 3}
				if (boxstatus[x-1] === 1) {score = score - 3}
				if (boxstatus[x+5] === 1) {score = score - 3}
				if (boxstatus[x-5] === 1) {score = score - 3}
				if (boxstatus[x+4] === 1) {score = score + 1}
				if (boxstatus[x+6] === 1) {score = score + 1}
				if (boxstatus[x-4] === 1) {score = score + 1}
				if (boxstatus[x-6] === 1) {score = score + 1}
			}
		}
	}
	document.getElementById('score').innerHTML = (score);
	score = 0;
}

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
			document.getElementById("game").remove();
		}
		document.getElementById('counter').innerHTML = (boxCounter-boxesClicked);
	}
}

