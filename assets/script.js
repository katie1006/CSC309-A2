// global variables
var currentState = 0;
var timerMethod;
var timerCount = 60;
var paused = false;
var currentScore = 200;
var canvasTop = -1;
var canvasLeft = -1;

// Black hole constants
var type_blue_hole = 0;
var type_purple_hole = 1;
var type_black_hole = 2;
var pull_speed = 20;
var path_blue_hole = "assets/images/blue_hole.svg";
var path_purple_hole = "assets/images/purple_hole.svg";
var path_black_hole = "assets/images/black_hole.svg";

// Constructor for black holes
var blackHoles = new Array();
var BlackHole = function(type, x, y) {
	this.x = x;
	this.y = y;
	if (type == type_blue_hole) {
		this.speed = 0.5;
		this.full = 3;
		this.point = 5;
	} else if (type == type_purple_hole) { 
		this.speed = 1;
		this.full = 2;
		this.point = 10;
	} else if (type == type_black_hole) { 
		this.speed = 2;
		this.full = 1;
		this.point = 20;
	} else {
		// otherwise, hmm.... something must be wrong
		console.log('Things went wrong! This kind of black hole does not exist!');
	}
}
BlackHole.prototype.onclick = function() {
	console.log("I'm clicked!");
	// dismiss this object
	
	// increase the score
}
var blackHoleMethod;

window.onload = function() {
	console.log('onload');
	var canvas = document.getElementById('view_port');
	window.ctx = canvas.getContext("2d");
};

$(document).ready(function() {
	if (typeof(Storage) !== "undefined") {
		/* use this variable currentState to control what scene to show
			0 -> start page
			1 -> level 1 game page
			2 -> level 1 finish page
			3 -> level 2 game page
			4 -> level 2 finish page
		*/
		currentState = 0;
	}
	
	$(window).resize(function() {
		var rect = document.getElementById('view_port').getBoundingClientRect();
		$('#overlay').css('left', (rect.left-6.5)+"px");
		canvasTop = rect.top;
		canvasLeft = rect.left;
	});
});

function switchScene() {
	if (currentState == 4) { // finished game, restart
		console.log('game finished');
		
		// TODO: update scene back to the start page
		$('#page_title').html('Solar Game');
		$('#page_button').html('START');
		// insert top scores
		
		currentState = 0;
	} else {
		console.log('change game/summary scene');
		// switch first, then update
		$('#transition_page').toggleClass('hide show');
		$('#game_page').toggleClass('hide show');
		currentState++;
		clearInterval(blackHoleMethod);
		
		if (currentState == 2) {
			// switched to level 1 summary page
			$('#page_title').html('Level# 1');
			$('#page_button').html('NEXT');
			
		} else if (currentState == 4) {
			// switched to level 2 summary page
			$('#page_title').html('Level# 2');
			$('#page_button').html('FINISH');
			
		} else { // 1 or 3
			// switched to game page
			var level = (currentState+1)/2;
			$('#level').html('Level# '+level);
			$('#score').html('Score: '+currentScore);
			timerMethod = setInterval(clock, 1000);
			
			$('#view_port').click(onCanvasClicked);
			var canvasRect = document.getElementById('view_port').getBoundingClientRect();
			canvasTop = canvasRect.top;
			canvasLeft = canvasRect.left;
			
			// draw the game objects
			drawGame();
		}
	}
}

function pause() {
	if (paused) { // resume game
		$('#overlay').toggleClass('hide show');
		timerMethod = setInterval(clock, 1000);
		blackHoleMethod = setInterval(createBlackHole, 1000);
		
		$('#pause_button').html('Pause');
		paused = false;
	} else  { // pause game
		var rect = document.getElementById('view_port').getBoundingClientRect();
		$('#overlay').toggleClass('hide show').css('left', (rect.left-6.5)+"px");
		clearInterval(timerMethod);
		clearInterval(blackHoleMethod);
		
		$('#pause_button').html('Resume');
		paused = true;
	}
}

function clock() {
	timerCount--;
	if (timerCount == 0) {
		clearInterval(timerMethod);
		// reset timer
		timerCount = 60;
		$('#timer').html('60 seconds');
		
		switchScene();
	} else {
		$('#timer').html(timerCount+' seconds');
	}
}

function drawGame() {
	blackHoleMethod = setInterval(createBlackHole, 3000);
	
}

function createBlackHole() {
	var rand = Math.random();
	var img = new Image();
	var x = Math.random()*950;
	var y = Math.random()*590;
	img.onload = function() {
		// the top left corner of the image is at (x,y)
		window.ctx.drawImage(img, x, y, 50, 50);
		// debug purpose
		window.ctx.strokeRect(x-25,y-25,100,100);
	}
	
	var newBlackHole;
	if (rand > 0.5) { // blue, most frequent
		img.src = path_blue_hole;
		newBlackHole = new BlackHole(0, x, y);
	} else if (rand > 0.15) { // purple, infrequent
		img.src = path_purple_hole;
		newBlackHole = new BlackHole(1, x, y);
	} else { // black, rare
		img.src = path_black_hole;
		newBlackHole = new BlackHole(2, x, y);
	}
	blackHoles.push(newBlackHole);
}

function onCanvasClicked(event) {
	console.log("canvas click");
	var xOnCanvas = event.pageX - canvasLeft;
	var yOnCanvas = event.pageY - canvasTop;
	
	// check if clicked on any black holes
	/*	Note:
		BlackHole object will be considered as clicked if it falls within
		25px of the coordinates of the click event.
		Since the coordinates of the BlackHole objects are their top left
		corner, and BlackHole objects has a width of 50px and a height of
		50px, all clicks within (x-25,y-25) and (x+75,y+75) will be considered
		as clicking on the object.
	 */
	for (var i=0; i<blackHoles.length; i++) {
		var bh = blackHoles[i];
		if (xOnCanvas > bh.x-25 && xOnCanvas < bh.x+75
			&& yOnCanvas > bh.y-25 && yOnCanvas < bh.y+75) {
				console.log('click on a bh!');
				break;
			}
	}
}