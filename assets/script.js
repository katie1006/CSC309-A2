// global variables
var currentState = 0;
var timerMethod;
var timerCount = 60;
var paused = false;
var currentScore = 200;
var canvasTop = -1;
var canvasLeft = -1;
var drawGameMethod;

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

var speedMultiplier = 5;
//declaring and randomly initializing 10 objects
//while animating,remember to update the coordicate of every objects(deletable)
// Note: coordinate of these 10 objects are the center!
var object1 = {     //moon
	x:Math.random() * 950 + 25,
	y:Math.random() * 590 + 25,
	xspeed: Math.random() * 2 * speedMultiplier - speedMultiplier,
	yspeed: Math.random() * 2 * speedMultiplier - speedMultiplier,
	draw: function(ctx){
		ctx.beginPath();
		ctx.arc(this.x, this.y, 25, 0, 2*Math.PI, true);
		ctx.strokeStyle = "white";
		ctx.stroke();
		ctx.fillStyle = "yellow";
		ctx.fill();

		ctx.beginPath();
		ctx.arc(this.x+15, this.y, 20, 0, 2*Math.PI, true);
		ctx.strokeStyle = "#7BADFF";
		ctx.stroke();
		ctx.fillStyle = "#7BADFF";
		ctx.fill();
	},
	update: objectUpdate,
	pullTo: function(blackHoleX, blackHoleY) {

	}
}

var object2 = {   //rocket
	x:Math.random() * 950 + 25,
	y:Math.random() * 590 + 40,
	xspeed: Math.random() * 2 * speedMultiplier - speedMultiplier,
	yspeed: Math.random() * 2 * speedMultiplier - speedMultiplier,
	draw: function(ctx){
		ctx.beginPath();
		ctx.moveTo(this.x, this.y);
		ctx.quadraticCurveTo(this.x+25, this.y, this.x, this.y-40);
		ctx.stroke();
		ctx.fillStyle = "blue";
		ctx.fill();

		ctx.beginPath();
		ctx.moveTo(this.x,this.y);
		ctx.quadraticCurveTo(this.x-25, this.y, this.x, this.y-40);
		ctx.stroke;
		ctx.fillStyle = "blue";
		ctx.fill();

		ctx.beginPath();
		ctx.moveTo(this.x-12.5, this.y-3);
		ctx.lineTo(this.x+12.5, this.y-3);
		ctx.lineTo(this.x+25, this.y+5);
		ctx.lineTo(this.x-25, this.y+5);
		ctx.stroke();
		ctx.fillStyle = "red";
		ctx.fill();
		ctx.beginPath();
		ctx.moveTo(this.x-12.5, this.y+5);
		ctx.lineTo(this.x-6.25, this.y+10);
		ctx.lineTo(this.x, this.y+5);
		ctx.stroke();
		ctx.fillStyle = "grey";
		ctx.fill();
		ctx.beginPath();
		ctx.moveTo(this.x+12.5, this.y+5);
		ctx.lineTo(this.x+6.25, this.y+10);
		ctx.lineTo(this.x, this.y+5);
		ctx.stroke();
		ctx.fillStyle = "grey";
		ctx.fill();
	},
	update: objectUpdate
}

var object3 = { //UFO
	x:Math.random() * 950,
	y:Math.random() * 590 + 40,
	xspeed: Math.random() * 2 * speedMultiplier - speedMultiplier,
	yspeed: Math.random() * 2 * speedMultiplier - speedMultiplier,
	draw: function(ctx){
		ctx.beginPath();
		ctx.moveTo(this.x, this.y);
		ctx.bezierCurveTo(this.x, this.y-40, this.x+50, this.y-40, this.x+50, this.y);
		ctx.strokeStyle = "black";
		ctx.stroke();
		ctx.fillStyle = "grey";
		ctx.fill();
		ctx.beginPath();
		ctx.moveTo(this.x, this.y);
		ctx.lineTo(this.x+50, this.y);
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(this.x+6.25, this.y+5, 5, 0, Math.PI *2, true);
		ctx.fillStyle = "purple";
		ctx.fill();
		ctx.arc(this.x+25, this.y+5, 5, 0, Math.PI*2, true);
		ctx.fillStyle = "purple";
		ctx.fill();
		ctx.beginPath();
		ctx.arc(this.x+43.75, this.y+5, 5, 0, Math.PI*2, true);
		ctx.fillStyle = "purple";
		ctx.fill();
	},
	update: objectUpdate
}

var object4 = { //the astronaut
	x:Math.random() * 950 + 25,
	y:Math.random() * 590 + 20,
	xspeed: Math.random() * 2 * speedMultiplier - speedMultiplier,
	yspeed: Math.random() * 2 * speedMultiplier - speedMultiplier,
	draw: function(ctx){
		ctx.beginPath();
		ctx.moveTo(this.x, this.y);
		ctx.arc(this.x, this.y, 17.5, 0, Math.PI*2, true);
		ctx.fillStyle = "#ffe6e6";
		ctx.fill();

		ctx.beginPath();
		ctx.moveTo(this.x-20, this.y+17.5);
		ctx.lineTo(this.x+20, this.y+17.5);
		ctx.lineTo(this.x+20, this.y+27.5);
		ctx.lineTo(this.x-20, this.y+27.5);
		ctx.lineTo(this.x-20, this.y+17.5);
		ctx.stroke();
		ctx.fillStyle = "orange";
		ctx.fill();
		ctx.beginPath();
		ctx.arc(this.x-12.5, this.y+30, 2.5, 0, Math.PI*2, true);
		ctx.fillStyle = "green";
		ctx.fill();
		ctx.beginPath();
		ctx.arc(this.x+12.5, this.y+30, 2.5, 0, Math.PI*2, true);
		ctx.fillStyle = "green";
		ctx.fill();

		ctx.beginPath();
		ctx.arc(this.x-10, this.y-7.5, 2.5, 0, Math.PI*2, true);
		ctx.fillStyle = "black";
		ctx.fill();
		ctx.beginPath();
		ctx.arc(this.x+10, this.y-7.5, 2.5, 0, Math.PI*2, true);
		ctx.fillStyle = "black";
		ctx.fill();

		ctx.beginPath();
		ctx.moveTo(this.x+10, this.y+5);
		ctx.bezierCurveTo(this.x+10, this.y+12.5, this.x-10, this.y+12.5, this.x-10, this.y+5);
		ctx.fillStyle = "red";
		ctx.fill();

		ctx.beginPath();
		ctx.arc(this.x-22.5, this.y+22.5, 2.5, 0, Math.PI*2, true);
		ctx.fillStyle = "green";
		ctx.fill();

		ctx.beginPath();
		ctx.arc(this.x+22.5, this.y+22.5, 2.5, 0, Math.PI*2, true);
		ctx.fillStyle = "green";
		ctx.fill();

		ctx.beginPath();
		ctx.arc(this.x-21.25, this.y, 3.75, 0, Math.PI*2, true);
		ctx.fillStyle = "green";
		ctx.fill();

		ctx.beginPath();
		ctx.arc(this.x+21.25, this.y, 3.75, 0, Math.PI*2, true);
		ctx.fillStyle = "green";
		ctx.fill();
	},
	update: objectUpdate
}

var object5 = { //saturn 
	x:Math.random() * 950 + 25,
	y:Math.random() * 590 + 25,
	xspeed: Math.random() * 2 * speedMultiplier - speedMultiplier,
	yspeed: Math.random() * 2 * speedMultiplier - speedMultiplier,
	draw: function(ctx){
		ctx.beginPath();
		ctx.arc(this.x, this.y, 25, 0, Math.PI*2, true);
		ctx.fillStyle = "#996600";
		ctx.fill();

		ctx.beginPath();
		ctx.lineJoin = "round";
		ctx.lineWidth = 5;
		ctx.moveTo(this.x-20, this.y+15);
		ctx.lineTo(this.x-25, this.y+25);
		ctx.lineTo(this.x-15, this.y+20);
		ctx.strokeStyle = "black";
		ctx.stroke();

		ctx.beginPath();
		ctx.lineJoin = "round";
		ctx.lineWidth = 5;
		ctx.moveTo(this.x+15, this.y-20);
		ctx.lineTo(this.x+25, this.y-25);
		ctx.lineTo(this.x+20, this.y-15);
		ctx.strokeStyle = "black";
		ctx.stroke();

		ctx.beginPath();
		ctx.moveTo(this.x-15, this.y+20);
		ctx.lineTo(this.x+20, this.y-15);
		ctx.lineWidth = 5;
		ctx.strokeStyle = "black";
		ctx.stroke();
	},
	update: objectUpdate
}

var object6 = { //surveillance aircraft
	x:Math.random() * 950 + 25,
	y:Math.random() * 590 + 25,
	xspeed: Math.random() * 2 * speedMultiplier - speedMultiplier,
	yspeed: Math.random() * 2 * speedMultiplier - speedMultiplier,
	draw: function(ctx){
		ctx.beginPath();
		ctx.moveTo(this.x-25, this.y-20);
		ctx.lineTo(this.x-20, this.y-25);
		ctx.lineTo(this.x+25, this.y+20);
		ctx.lineTo(this.x+20, this.y+25);	
		ctx.stroke();
		ctx.fillStyle = "black";
		ctx.fill();

		ctx.beginPath();
		ctx.moveTo(this.x-25, this.y+12.5);
		ctx.lineTo(this.x-12.5, this.y+25);
		ctx.lineTo(this.x+15, this.y-2.5);
		ctx.lineTo(this.x+2.5, this.y-15);
		ctx.fillStyle = "blue";
		ctx.fill();

		ctx.beginPath();
		ctx.lineWidth = 1;
		ctx.moveTo(this.x+15, this.y-2.5)
		ctx.bezierCurveTo(this.x+25, this.y-12.5, this.x+12.5, this.y-25, this.x+2.5, this.y-15);
		ctx.strokeStyle = "black";
		ctx.stroke();
	},
	update: objectUpdate
}

var object7 = { // unknown planet
	x:Math.random() * 950 + 25,
	y:Math.random() * 590 + 25,
	xspeed: Math.random() * 2 * speedMultiplier - speedMultiplier,
	yspeed: Math.random() * 2 * speedMultiplier - speedMultiplier,
	draw: function(ctx){
		var anothergrd = ctx.createRadialGradient(this.x, this.y, 1, this.x, this.y, 30);
		anothergrd.addColorStop(0,"red");
		anothergrd.addColorStop(1,"white");
		ctx.beginPath();
		ctx.arc(this.x, this.y, 25, 0, Math.PI*2, true);
		ctx.lineWidth = 3;
		ctx.strokeStyle = "black";
		ctx.stroke();
		ctx.fillStyle = anothergrd;
		ctx.fill();


		ctx.beginPath();
		ctx.lineJoin = "round";
		ctx.lineWidth = 3;
		ctx.moveTo(this.x-20, this.y+15);
		ctx.lineTo(this.x-25, this.y+25);
		ctx.lineTo(this.x-15, this.y+20);
		ctx.strokeStyle = "black";
		ctx.stroke();

		ctx.beginPath();
		ctx.lineJoin = "round";
		ctx.lineWidth = 3;
		ctx.moveTo(this.x+15, this.y-20);
		ctx.lineTo(this.x+25, this.y-25);
		ctx.lineTo(this.x+20, this.y-15);
		ctx.strokeStyle = "black";
		ctx.stroke();

		ctx.beginPath();
		ctx.moveTo(this.x-15, this.y+20);
		ctx.lineTo(this.x+20, this.y-15);
		ctx.lineWidth = 3;
		ctx.strokeStyle = "black";
		ctx.stroke();
	},
	update: objectUpdate
}

var object8 = { //space garbage
	x:Math.random() * 950 + 25,
	y:Math.random() * 590 + 25,
	xspeed: Math.random() * 2 * speedMultiplier - speedMultiplier,
	yspeed: Math.random() * 2 * speedMultiplier - speedMultiplier,
	draw: function(ctx){
		ctx.beginPath();
		ctx.arc(this.x, this.y, 25, 0, Math.PI*2, true);
		ctx.lineWidth = 1;
		ctx.strokeStyle = "black";
		ctx.stroke();

		ctx.beginPath();
		ctx.moveTo(this.x-20, this.y-5);
		ctx.lineTo(this.x-20, this.y+5);
		ctx.lineTo(this.x+20, this.y+5);
		ctx.lineTo(this.x+20, this.y-5);
		ctx.fillStyle = "red";
		ctx.fill();

		ctx.beginPath();
		ctx.moveTo(this.x-5, this.y-20);
		ctx.lineTo(this.x+5, this.y-20);
		ctx.lineTo(this.x+5, this.y+20);
		ctx.lineTo(this.x-5, this.y+20);
		ctx.fillStyle = "red";
		ctx.fill();

		ctx.beginPath();
		ctx.arc(this.x, this.y, 6, 0, Math.PI*2, true);
		ctx.fillStyle = "black";
		ctx.fill();
	},
	update: objectUpdate
}

var object9 = {  //a really colorful planet
	x:Math.random() * 950 + 25,
	y:Math.random() * 590 + 25,
	xspeed: Math.random() * 2 * speedMultiplier - speedMultiplier,
	yspeed: Math.random() * 2 * speedMultiplier - speedMultiplier,
	draw: function(ctx){
		var grd=ctx.createLinearGradient(this.x-25, this.y-25, this.x+25, this.y+25);
		grd.addColorStop(0,"black");
		grd.addColorStop("0.2","#cc3300");
		grd.addColorStop("0.4","#0033cc");
		grd.addColorStop("0.6","#009933");
		grd.addColorStop("0.8","#ff0066");
		grd.addColorStop(1,"#ccccff");

		ctx.beginPath();
		ctx.arc(this.x, this.y, 25, 0, Math.PI*2, true);
		ctx.lineWidth = 2;
		ctx.strokeStyle = "black";
		ctx.stroke();
		ctx.fillStyle = grd;
		ctx.fill();
	},
	update: objectUpdate
}

var object10 = { //a star surrounded by four little stars 
	x:Math.random() * 950 + 25,
	y:Math.random() * 590 + 25,
	xspeed: Math.random() * 2 * speedMultiplier - speedMultiplier,
	yspeed: Math.random() * 2 * speedMultiplier - speedMultiplier,
	draw: function(ctx){
		ctx.beginPath();
		ctx.moveTo(this.x, this.y-25);
		ctx.lineTo(this.x-10, this.y-10);
		ctx.lineTo(this.x-25, this.y);
		ctx.lineTo(this.x-10, this.y+10);
		ctx.lineTo(this.x, this.y+25);  //fifth point
		ctx.lineTo(this.x+10, this.y+10);
		ctx.lineTo(this.x+25, this.y);
		ctx.lineTo(this.x+10, this.y-10);
		ctx.lineTo(this.x, this.y-25);

		ctx.stroke();
		ctx.fillStyle = "yellow";
		ctx.fill();

		ctx.beginPath();
		ctx.moveTo(this.x-17.5, this.y-25);
		ctx.lineTo(this.x-20, this.y-20);
		ctx.lineTo(this.x-25, this.y-17.5);
		ctx.lineTo(this.x-20, this.y-15);
		ctx.lineTo(this.x-17.5, this.y-10);
		ctx.lineTo(this.x-15, this.y-15);
		ctx.lineTo(this.x-10, this.y-17.5);
		ctx.lineTo(this.x-15, this.y-20);
		ctx.lineTo(this.x-17.5, this.y-25);
		ctx.stroke();
		ctx.fillStyle = "yellow";
		ctx.fill();

		ctx.beginPath();  //the second mini star
		ctx.moveTo(this.x+17.5, this.y-25);
		ctx.lineTo(this.x+20, this.y-20);
		ctx.lineTo(this.x+25, this.y-17.5);
		ctx.lineTo(this.x+20, this.y-15);
		ctx.lineTo(this.x+17.5, this.y-10);
		ctx.lineTo(this.x+15, this.y-15);
		ctx.lineTo(this.x+10, this.y-17.5);
		ctx.lineTo(this.x+15, this.y-20);
		ctx.lineTo(this.x+17.5, this.y-25);
		ctx.stroke();
		ctx.fillStyle = "yellow";
		ctx.fill();

		ctx.beginPath();  //the third mini star
		ctx.moveTo(this.x+17.5, this.y+25);
		ctx.lineTo(this.x+20, this.y+20);
		ctx.lineTo(this.x+25, this.y+17.5);
		ctx.lineTo(this.x+20, this.y+15);
		ctx.lineTo(this.x+17.5, this.y+10);
		ctx.lineTo(this.x+15, this.y+15);
		ctx.lineTo(this.x+10, this.y+17.5);
		ctx.lineTo(this.x+15, this.y+20);
		ctx.lineTo(this.x+17.5, this.y+25);
		ctx.stroke();
		ctx.fillStyle = "yellow";
		ctx.fill();

		ctx.beginPath();  //the forth mini star
		ctx.moveTo(this.x-17.5, this.y+25);
		ctx.lineTo(this.x-20, this.y+20);
		ctx.lineTo(this.x-25, this.y+17.5);
		ctx.lineTo(this.x-20, this.y+15);
		ctx.lineTo(this.x-17.5, this.y+10);
		ctx.lineTo(this.x-15, this.y+15);
		ctx.lineTo(this.x-10, this.y+17.5);
		ctx.lineTo(this.x-15, this.y+20);
		ctx.lineTo(this.x-17.5, this.y+25);
		ctx.stroke();
		ctx.fillStyle = "yellow";
		ctx.fill();
	},
	update: objectUpdate
}

// uniform update function for all 10 objects
// xspeed decides the x-direction of the moving
// yspeed decides the y coordinate depends on the current x coordinate
function objectUpdate(){
	if (this.x > 1000 || this.x < 0) {
		this.xspeed = -this.xspeed;
	}
	if (this.y > 640 || this.y < 0) {
		this.yspeed = -this.yspeed;
	}

	this.x += this.xspeed;
	this.y += this.yspeed;

	this.draw(window.ctx);
}

//array of 10 objects
var spaceObjects = [object1,object2,object3,object4,object5,object6,object7,object8,object9,object10];

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
			drawSpaceObjectsWithoutUpdate();
			blackHoleMethod = setInterval(createBlackHole, 3000);
			drawGameMethod = setInterval(drawGame, 33);
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
	window.ctx.beginPath();
	window.ctx.clearRect(0,0,1000,640);

	// draw space objects
	for (var i=0; i<spaceObjects.length; i++) {
		spaceObjects[i].update();
	}
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

function drawSpaceObjectsWithoutUpdate() {
	window.ctx.beginPath();
	for (var i=0; i<spaceObjects.length; i++) {
		spaceObjects[i].draw(window.ctx);
	}
}