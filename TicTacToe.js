var canvas, ctx;

var gameSize = 390;
var lineSize = 5;
var tileSize = (gameSize - (lineSize * 2)) / 3;

var backColor = '#72759c'
var boardColor = 'white';
var xColor = '#42f4e8';
var oColor = '#f4d142';

var p1Wins = 0;
var p2Wins = 0;

var human = true;
var simple = false;
var harder = false;

var possibleWins = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];

//Set think time between 1 and 2 seconds
var thinkTime = (Math.random() * 500) + 500;

//Set background color
document.body.style.backgroundColor = backColor;

//Set text color to gameboard color
document.getElementById('player').style.color = boardColor;
document.getElementById('again').style.color = xColor;
document.getElementById('again').style.borderColor = oColor;
document.getElementById('p1Wins').style.color = xColor;
document.getElementById('p2Wins').style.color = oColor;
document.getElementById('gameModeTitle').style.color = boardColor;

//Create canvas
canvas = document.createElement('canvas');
canvas.width = gameSize;
canvas.height = gameSize;
ctx = canvas.getContext('2d');
document.body.appendChild(canvas);

//Create variables for squares in game board
//
//  sqrs[0] sqrs[1] sqrs[2]
//  sqrs[3] sqrs[4] sqrs[5]
//  sqrs[6] sqrs[7] sqrs[8]
//
var sqrs = [];

var player1;
var xWins;
var oWins;
var gameOver;

//Create game board lines
function drawGameBoard() {
	ctx.beginPath();
	ctx.moveTo(tileSize, (tileSize * .05));
	ctx.lineTo(tileSize, (gameSize - (tileSize * .05)));
	ctx.lineWidth = lineSize;
	ctx.lineCap = 'round';
	ctx.strokeStyle = boardColor;
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(((tileSize * 2) + lineSize), (gameSize - (tileSize * .05)));
	ctx.lineTo(((tileSize * 2) + lineSize), (tileSize * .05));
	ctx.lineWidth = lineSize;
	ctx.lineCap = 'round';
	ctx.strokeStyle = boardColor;
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo((tileSize * .05), tileSize);
	ctx.lineTo((gameSize - (tileSize * .05)), tileSize);
	ctx.lineWidth = lineSize;
	ctx.lineCap = 'round';
	ctx.strokeStyle = boardColor;
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo((gameSize - (tileSize * .05)), ((tileSize * 2) + lineSize));
	ctx.lineTo((tileSize * .05), ((tileSize * 2) + lineSize));
	ctx.lineWidth = lineSize;
	ctx.lineCap = 'round';
	ctx.strokeStyle = boardColor;
	ctx.stroke();
}

canvas.onclick = function(evt) {
	//use pageX and pageY to get mouse position relative to browser window
	var mouse = {
		x: evt.pageX - canvas.offsetLeft,
		y: evt.pageY - canvas.offsetTop
	};

	if (player1 || human) {
		//If the game is not over
		if (!gameOver) {
			//Squares 1,2,3
			if (mouse.y > 0 && mouse.y <= tileSize) {
				//Click sqrs[0]
				if (mouse.x > 0 && mouse.x <= tileSize) {
					playSquare(sqrs[0]);
				}
				//Click sqrs[1]
				if (mouse.x > (tileSize + lineSize) && mouse.x <= ((tileSize * 2) + lineSize)) {
					playSquare(sqrs[1]);
				}
				//Click sqrs[2]
				if (mouse.x > ((tileSize * 2) + (lineSize * 2)) && mouse.x <= gameSize) {
					playSquare(sqrs[2]);
				}
			}
			//Squares 4,5,6
			if (mouse.y > (tileSize + lineSize) && mouse.y <= ((tileSize * 2) + lineSize)) {
				//Click sqrs[3]
				if (mouse.x > 0 && mouse.x <= tileSize) {
					playSquare(sqrs[3]);
				}
				//Click sqrs[4]
				if (mouse.x > (tileSize + lineSize) && mouse.x <= ((tileSize * 2) + lineSize)) {
					playSquare(sqrs[4]);
				}
				//Click sqrs[5]
				if (mouse.x > ((tileSize * 2) + (lineSize * 2)) && mouse.x <= gameSize) {
					playSquare(sqrs[5]);
				}
			}
			//Squares 7,8,9
			if (mouse.y > ((tileSize * 2) + (lineSize * 2)) && mouse.y <= gameSize) {
				//Click sqrs[6]
				if (mouse.x > 0 && mouse.x <= tileSize) {
					playSquare(sqrs[6]);
				}
				//Click sqrs[7]
				if (mouse.x > (tileSize + lineSize) && mouse.x <= ((tileSize * 2) + lineSize)) {
					playSquare(sqrs[7]);
				}
				//Click sqrs[8]
				if (mouse.x > ((tileSize * 2) + (lineSize * 2)) && mouse.x <= gameSize) {
					playSquare(sqrs[8]);
				}
			}
		}
	}
};

//Checks if square is empty
//If so, sets square to x for player 1, o for player 2
//Sets square to not empty and switches player
function playSquare(square) {
	if (square.isEmpty === true) {
		if (player1 === true) {
			square.isX = true;
			drawX(square.centerX, square.centerY);
		} else {
			square.isO = true;
			drawO(square.centerX, square.centerY);
		}
		square.isEmpty = false;
		checkWin();
		switchPlayer();
	}
}

//Switch player
function switchPlayer() {
	if (player1 === true) {
		//Switch to player 2
		player1 = false;
		if (!gameOver) {
			if (human) {
				document.getElementById("player").innerHTML = "Player 2's turn";
			} else {
				document.getElementById("player").innerHTML = "Computer's turn";
			}
		}
		if (simple) {
			setTimeout(simpleAI, thinkTime);
		}
		if (harder) {
			setTimeout(harderAI, thinkTime);
		}
	} else {
		//Swich to player 1
		player1 = true;
		if (!gameOver) {
			if (human) {
				document.getElementById("player").innerHTML = "Player 1's turn";
			} else {
				document.getElementById("player").innerHTML = "Human's turn";
			}
		}
	}
}

//Draw X in selected tile
function drawX(centerX, centerY) {
	ctx.beginPath();
	ctx.moveTo(centerX - (tileSize * .3), centerY - (tileSize * .3));
	ctx.lineTo(centerX + (tileSize * .3), centerY + (tileSize * .3));
	ctx.lineWidth = lineSize;
	ctx.lineCap = 'round';
	ctx.strokeStyle = xColor;
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(centerX + (tileSize * .3), centerY - (tileSize * .3));
	ctx.lineTo(centerX - (tileSize * .3), centerY + (tileSize * .3));
	ctx.lineWidth = lineSize;
	ctx.lineCap = 'round';
	ctx.strokeStyle = xColor;
	ctx.stroke();
}

//Draw O in selected tile
function drawO(centerX, centerY) {
	ctx.beginPath();
	ctx.arc(centerX, centerY, (tileSize * .33), 0, 2 * Math.PI);
	ctx.lineWidth = lineSize;
	ctx.strokeStyle = oColor;
	ctx.stroke();
}

//Draw winning line
function drawWin(startX, startY, endX, endY) {
	var finishColor;
	if (xWins === true) {
		finishColor = xColor;
	} else {
		finishColor = oColor;
	}
	ctx.beginPath();
	ctx.moveTo(startX, startY);
	ctx.lineTo(endX, endY);
	ctx.lineWidth = lineSize * 1.4;
	ctx.lineCap = 'round';
	ctx.strokeStyle = finishColor;
	ctx.stroke();
}

//Check if the tile selected was a game winning move
function checkWin() {
	//X wins
	for (var i = 0; i < possibleWins.length; i++) {
		if(sqrs[possibleWins[i][0]].isX && sqrs[possibleWins[i][1]].isX && sqrs[possibleWins[i][2]].isX) {
			xWins = true;
			drawWin(sqrs[possibleWins[i][0]].centerX, sqrs[possibleWins[i][0]].centerY, 
				sqrs[possibleWins[i][2]].centerX, sqrs[possibleWins[i][2]].centerY);
			p1Wins++;
			gameOver = true;
			if (human) {
				document.getElementById("player").innerHTML = "Player 1 wins!";
			} else {
				document.getElementById("player").innerHTML = "Human wins!";
			}
		}
	}
	//O wins
	for (var i = 0; i < possibleWins.length; i++) {
		if(sqrs[possibleWins[i][0]].isO && sqrs[possibleWins[i][1]].isO && sqrs[possibleWins[i][2]].isO) {
			oWins = true;
			drawWin(sqrs[possibleWins[i][0]].centerX, sqrs[possibleWins[i][0]].centerY, 
				sqrs[possibleWins[i][2]].centerX, sqrs[possibleWins[i][2]].centerY);
			p2Wins++;
			gameOver = true;
			if (human) {
				document.getElementById("player").innerHTML = "Player 2 wins!";
			} else {
				document.getElementById("player").innerHTML = "Computer wins!";
			}
		}
	}
	//Cat's game
	if (!(sqrs[0].isEmpty || sqrs[1].isEmpty || sqrs[2].isEmpty || sqrs[3].isEmpty ||
		sqrs[4].isEmpty || sqrs[5].isEmpty || sqrs[6].isEmpty || sqrs[7].isEmpty || 
		sqrs[8].isEmpty) && !(xWins || oWins)) {
		gameOver = true;
		document.getElementById("player").innerHTML = "Cat's game!";
	}
	//Display winning text and play again button
	if (gameOver) {
		if (human) {
			document.getElementById("p1Wins").innerHTML = "Player 1 Wins: " + p1Wins;
			document.getElementById("p2Wins").innerHTML = "Player 2 Wins: " + p2Wins;
		} else {
			document.getElementById("p1Wins").innerHTML = "Human Wins: " + p1Wins;
			document.getElementById("p2Wins").innerHTML = "Computer Wins: " + p2Wins;
		}
		setTimeout(playAgain, 1000);		
	}
}

//Set play again button to visible
function playAgain() {
	document.getElementById("again").style.visibility = "visible";
}

//Reset win counter to 0
function resetWins() {
	p1Wins = 0;
	p2Wins = 0;
	document.getElementById("p1Wins").innerHTML = "Player 1 Wins: " + p1Wins;
	document.getElementById("p2Wins").innerHTML = "Player 2 Wins: " + p2Wins;
}

//Set gamemode to human vs human
function setHuman() {
	simple = false;
	harder = false;
	human = true;
	newGame();
	resetWins();
}

//Set gamemode to simple AI
function setSimpleAI() {
	human = false;
	harder = false;
	simple = true;
	newGame();
	resetWins();
}

//Set gamemode to harder AI
function setHarderAI() {
	human = false;
	simple = false;
	harder = true;
	newGame();
	resetWins();
}

//Simple AI that picks an empty square at random
function simpleAI() {
	if (player1 === false && gameOver === false) {
		var emptySqrs = [];
		for (var i = 0; i < sqrs.length; i++) {
			if (sqrs[i].isEmpty) {
				emptySqrs.push(i);
			}
		}
		var AIPlay = Math.floor(Math.random() * emptySqrs.length);

		playSquare(sqrs[emptySqrs[AIPlay]]);
	}
}

//Harder AI that simply blocks human move and attempts win if possible
//First priority is to play a winning move
//Second priority is to block the opponent from making a winning move
//If neither of the first two options is available, play a random square
function harderAI() {
	if (player1 == false && gameOver === false) {
		var emptySqrs = [];
		for (var i = 0; i < sqrs.length; i++) {
			if (sqrs[i].isEmpty) {
				emptySqrs.push(i);
			}
		}
		//Check if computer has possible win
		for (var i = 0; i < possibleWins.length; i++) {
			if(sqrs[possibleWins[i][0]].isO && sqrs[possibleWins[i][1]].isO && sqrs[possibleWins[i][2]].isEmpty
				&& player1 === false) {
				playSquare(sqrs[possibleWins[i][2]]);
			}
			if(sqrs[possibleWins[i][0]].isO && sqrs[possibleWins[i][1]].isEmpty && sqrs[possibleWins[i][2]].isO
				&& player1 === false) {
				playSquare(sqrs[possibleWins[i][1]]);
			}
			if(sqrs[possibleWins[i][0]].isEmpty && sqrs[possibleWins[i][1]].isO && sqrs[possibleWins[i][2]].isO
				&& player1 === false) {
				playSquare(sqrs[possibleWins[i][0]]);
			}
		}

		//Check if player1 has possible win
		for (var i = 0; i < possibleWins.length; i++) {
			if(sqrs[possibleWins[i][0]].isX && sqrs[possibleWins[i][1]].isX && sqrs[possibleWins[i][2]].isEmpty
				&& player1 === false) {
				playSquare(sqrs[possibleWins[i][2]]);
			}
			if(sqrs[possibleWins[i][0]].isX && sqrs[possibleWins[i][1]].isEmpty && sqrs[possibleWins[i][2]].isX
				&& player1 === false) {
				playSquare(sqrs[possibleWins[i][1]]);
			}
			if(sqrs[possibleWins[i][0]].isEmpty && sqrs[possibleWins[i][1]].isX && sqrs[possibleWins[i][2]].isX
				&& player1 === false) {
				playSquare(sqrs[possibleWins[i][0]]);
			}
		}
		//If no possible wins for X or O, play random square
		if (!player1) {
			var AIPlay = Math.floor(Math.random() * emptySqrs.length);

			playSquare(sqrs[emptySqrs[AIPlay]]);
		}
	}
}

//Reset game original state
function newGame() {
	for (var i = 0; i < 9; i++) {
		sqrs[i] = {
			isEmpty:true, isX:false, isO:false,
			centerX:0, centerY:0
		}
	}
	sqrs[0].centerX = tileSize / 2;
	sqrs[0].centerY = tileSize / 2; 
	sqrs[1].centerX = gameSize / 2;
	sqrs[1].centerY = tileSize / 2; 
	sqrs[2].centerX = gameSize - (tileSize / 2);
	sqrs[2].centerY = tileSize / 2;
	sqrs[3].centerX = tileSize / 2;
	sqrs[3].centerY = gameSize / 2; 
	sqrs[4].centerX = gameSize / 2;
	sqrs[4].centerY = gameSize / 2; 
	sqrs[5].centerX = gameSize - (tileSize / 2);
	sqrs[5].centerY = gameSize / 2;
	sqrs[6].centerX = tileSize / 2;
	sqrs[6].centerY = gameSize - (tileSize / 2); 
	sqrs[7].centerX = gameSize / 2;
	sqrs[7].centerY = gameSize - (tileSize / 2); 
	sqrs[8].centerX = gameSize - (tileSize / 2);
	sqrs[8].centerY = gameSize - (tileSize / 2);	

	player1 = true;
	xWins = false;
	oWins = false;
	gameOver = false;

	//Set appropriate player turn and scoreboard text
	if (human) {
		document.getElementById("player").innerHTML = "Player 1's turn";
		document.getElementById("p1Wins").innerHTML = "Player 1 Wins: " + p1Wins;
		document.getElementById("p2Wins").innerHTML = "Player 2 Wins: " + p2Wins;
	} else {
		document.getElementById("player").innerHTML = "Human's turn";
		document.getElementById("p1Wins").innerHTML = "Human Wins: " + p1Wins;
		document.getElementById("p2Wins").innerHTML = "Computer Wins: " + p2Wins;
	}

	//Clear canvas
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	drawGameBoard();

	//Hide play again button
	document.getElementById("again").style.visibility = "hidden";
}

newGame();
