// global variables
var currentState = 0;
var timerMethod;
var timerCount = 60;
var paused = false;
var currentScore = 200;

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
var BlackHole = function(type) {
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


//declaring and randomly initializing 10 objects
//while animating,remember to update the coordicate of every objects(deletable)
var object1 = {     //moon
	x:Math.random() * 950 + 25,
	y:Math.random() * 590 + 25,
	xspeed: Math.random() * 100,
	yspeed:Math.random() * 100
}

var object2 = {   //rocket
	x:Math.random() * 950 + 25,
	y:Math.random() * 590 + 40,
	xspeed:Math.random() * 100,
	yspeed:Math.random() * 100
}

var object3 = { //UFO
	x:Math.random() * 950,
	y:Math.random() * 590 + 40,
	xspeed:Math.random() * 100,
	yspeed:Math.random() * 100
}

var object4 = { //the astronaut
	x:Math.random() * 950 + 25,
	y:Math.random() * 590 + 20,
	xspeed:Math.random() * 100,
	yspeed:Math.random() * 100
}

var object5 = { //saturn 
	x:Math.random() * 950 + 25,
	y:Math.random() * 590 + 25,
	xspeed:Math.random() * 100,
	yspeed:Math.random() * 100
}

var object6 = { //surveillance aircraft
	x:Math.random() * 950 + 25,
	y:Math.random() * 590 + 25,
	xspeed:Math.random() * 100,
	yspeed:Math.random() * 100
}

var object7 = { // unknown planet
	x:Math.random() * 950 + 25,
	y:Math.random() * 590 + 25,
	xspeed: Math.random() * 100,
	yspeed:Math.random() * 100
}

var object8 = { //space garbage
	x:Math.random() * 950 + 25,
	y:Math.random() * 590 + 25,
	xspeed:Math.random() * 100,
	yspeed:Math.random() * 100
}

var object9 = {  //a really colorful planet
	x:Math.random() * 950 + 25,
	y:Math.random() * 590 + 25,
	xspeed:Math.random() * 100,
	yspeed: Math.random() * 100
}

var object10 = { //star 
	x:Math.random() * 950 + 25,
	y:Math.random() * 590 + 25,
	xspeed:Math.random() * 100,
	yspeed:Math.random() * 100
}

window.onload = function(){
    
    var c = document.getElementById("view_port");
	var ctx = c.getContext("2d");
	//usually maximum of x-coordinate is 975 and minimum is 25
	//usually maximum of y-coordinate is 615 and minimum is 25
	//975-25 = 950  ,    615-25 = 590;
	//but for the UFO, maximum of x-coordinate is 950 and minimum is 0
	// the interface is 1000 width and 640 height 
	


	draw1(ctx,object1.x,object1.y);//the cresent moon
	draw2(ctx,object2.x,object2.y);  //the rocket
	draw3(ctx,object2.x,object3.y); // the UFO
	draw4(ctx,object4.x,object4.y);//the astronaut
	draw5(ctx,object5.x,object5.y); // the saturn
	draw6(ctx,object6.x,object6.y); //the surveillance aircraft
	draw7(ctx,object7.x,object7.y);//the unknown planet
	draw8(ctx,object8.x,object8.y);//the garbage
	draw9(ctx,object9.x,object9.y);  //a really colorful planet
	draw10(ctx,object10.x,object10.y);  // a star

	// setTimeout(animate1(ctx,object1),33);
 
}
	

function draw1(ctx, x,y){   //moon
 	
 

 	ctx.beginPath();
	ctx.arc(x,y,25,0,2*Math.PI,true);
	ctx.strokeStyle = "white";
	ctx.stroke();
	ctx.fillStyle = "yellow";
	ctx.fill();

	ctx.beginPath();
	ctx.arc(x+15,y,20,0,2*Math.PI,true);
	ctx.strokeStyle = "#7BADFF";
	ctx.stroke();
	ctx.fillStyle = "#7BADFF";
	ctx.fill();



 }

 function draw2(ctx,x,y){   //rocket 
 	ctx.beginPath();
	ctx.moveTo(x,y);
	ctx.quadraticCurveTo(x+25,y,x, y-40);
	ctx.stroke();
	ctx.fillStyle = "blue";
	ctx.fill();

	ctx.beginPath();
	ctx.moveTo(x,y);
	ctx.quadraticCurveTo(x-25,y,x,y-40);
	ctx.stroke;
	ctx.fillStyle = "blue";
	ctx.fill();

	ctx.beginPath();
	ctx.moveTo(x-12.5,y-3);
	ctx.lineTo(x+12.5,y-3);
	ctx.lineTo(x+25,y+5);
	ctx.lineTo(x-25,y+5);
	ctx.stroke();
	ctx.fillStyle = "red";
	ctx.fill();
	ctx.beginPath();
	ctx.moveTo(x-12.5,y+5);
	ctx.lineTo(x-6.25,y+10);
	ctx.lineTo(x,y+5);
	ctx.stroke();
	ctx.fillStyle = "grey";
	ctx.fill();
	ctx.beginPath();
	ctx.moveTo(x+12.5,y+5);
	ctx.lineTo(x+6.25,y+10);
	ctx.lineTo(x,y+5);
	ctx.stroke();
	ctx.fillStyle = "grey";
	ctx.fill();
 }

 function draw3(ctx,x,y){   //UFO 
 	ctx.beginPath();
	ctx.moveTo(x, y);
	ctx.bezierCurveTo(x, y-40, x+50, y-40, x+50, y);
	ctx.strokeStyle = "black";
	ctx.stroke();
	ctx.fillStyle = "grey";
	ctx.fill();
	ctx.beginPath();
	ctx.moveTo(x,y);
	ctx.lineTo(x+50,y);
	ctx.stroke();
	ctx.beginPath();
	ctx.arc(x+6.25,y+5,5,0,Math.PI *2, true);
	ctx.fillStyle = "purple";
	ctx.fill();
	ctx.arc(x+25,y+5,5,0,Math.PI*2, true);
	ctx.fillStyle = "purple";
	ctx.fill();
	ctx.beginPath();
	ctx.arc(x+43.75, y+5, 5,0,Math.PI*2, true);
	ctx.fillStyle = "purple";
	ctx.fill();
 }

 function draw4(ctx,x,y){ //astronaut
 	ctx.beginPath();
	ctx.moveTo(x,y);
	ctx.arc(x,y,17.5,0,Math.PI*2,true);
	ctx.fillStyle = "#ffe6e6";
	ctx.fill();

	ctx.beginPath();
	ctx.moveTo(x-20,y+17.5);
	ctx.lineTo(x+20,y+17.5);
	ctx.lineTo(x+20,y+27.5);
	ctx.lineTo(x-20,y+27.5);
	ctx.lineTo(x-20,y+17.5);
	ctx.stroke();
	ctx.fillStyle = "orange";
	ctx.fill();
	ctx.beginPath();
	ctx.arc(x-12.5,y+30,2.5,0,Math.PI*2,true);
	ctx.fillStyle = "green";
	ctx.fill();
	ctx.beginPath();
	ctx.arc(x+12.5,y+30,2.5,0,Math.PI*2,true);
	ctx.fillStyle = "green";
	ctx.fill();

	ctx.beginPath();
	ctx.arc(x-10,y-7.5,2.5,0,Math.PI*2,true);
	ctx.fillStyle = "black";
	ctx.fill();
	ctx.beginPath();
	ctx.arc(x+10,y-7.5,2.5,0,Math.PI*2,true);
	ctx.fillStyle = "black";
	ctx.fill();

	ctx.beginPath();
	ctx.moveTo(x+10,y+5);
	ctx.bezierCurveTo(x+10,y+12.5,x-10,y+12.5,x-10,y+5);
	ctx.fillStyle = "red";
	ctx.fill();

	ctx.beginPath();
	ctx.arc(x-22.5,y+22.5,2.5,0,Math.PI*2,true);
	ctx.fillStyle = "green";
	ctx.fill();

	ctx.beginPath();
	ctx.arc(x+22.5,y+22.5,2.5,0,Math.PI*2,true);
	ctx.fillStyle = "green";
	ctx.fill();

	ctx.beginPath();
	ctx.arc(x-21.25,y,3.75,0,Math.PI*2,true);
	ctx.fillStyle = "green";
	ctx.fill();

	ctx.beginPath();
	ctx.arc(x+21.25,y, 3.75,0,Math.PI*2, true);
	ctx.fillStyle = "green";
	ctx.fill();

 }

function draw5(ctx,x,y){  //saturn 
	ctx.beginPath();
	ctx.arc(x,y,25,0,Math.PI*2,true);
	ctx.fillStyle = "#996600";
	ctx.fill();

	ctx.beginPath();
	ctx.lineJoin = "round";
	ctx.lineWidth = 5;
	ctx.moveTo(x-20,y+15);
	ctx.lineTo(x-25,y+25);
	ctx.lineTo(x-15,y+20);
	ctx.strokeStyle = "black";
	ctx.stroke();

	ctx.beginPath();
	ctx.lineJoin = "round";
	ctx.lineWidth = 5;
	ctx.moveTo(x+15,y-20);
	ctx.lineTo(x+25,y-25);
	ctx.lineTo(x+20,y-15);
	ctx.strokeStyle = "black";
	ctx.stroke();

	ctx.beginPath();
	ctx.moveTo(x-15,y+20);
	ctx.lineTo(x+20,y-15);
	ctx.lineWidth = 5;
	ctx.strokeStyle = "black";
	ctx.stroke();

 }

 function draw6(ctx,x,y){   //surveillance aircraft
 	ctx.beginPath();
	ctx.moveTo(x-25,y-20);
	ctx.lineTo(x-20,y-25);
	ctx.lineTo(x+25,y+20);
	ctx.lineTo(x+20,y+25);	
	ctx.stroke();
	ctx.fillStyle = "black";
	ctx.fill();

	ctx.beginPath();
	ctx.moveTo(x-25,y+12.5);
	ctx.lineTo(x-12.5,y+25);
	ctx.lineTo(x+15,y-2.5);
	ctx.lineTo(x+2.5,y-15);
	ctx.fillStyle = "blue";
	ctx.fill();

	ctx.beginPath();
	ctx.lineWidth = 1;
	ctx.moveTo(x+15,y-2.5)
	ctx.bezierCurveTo(x+25,y-12.5,x+12.5,y-25,x+2.5,y-15);
	ctx.strokeStyle = "black";
	ctx.stroke();

 }

 function draw7(ctx,x,y){   //unknown planet 
 	var anothergrd = ctx.createRadialGradient(x,y,1,x,y,30);
	anothergrd.addColorStop(0,"red");
	anothergrd.addColorStop(1,"white");
	ctx.beginPath();
	ctx.arc(x,y,25,0,Math.PI*2,true);
	ctx.lineWidth = 3;
	ctx.strokeStyle = "black";
	ctx.stroke();
	ctx.fillStyle = anothergrd;
	ctx.fill();


	ctx.beginPath();
	ctx.lineJoin = "round";
	ctx.lineWidth = 3;
	ctx.moveTo(x-20,y+15);
	ctx.lineTo(x-25,y+25);
	ctx.lineTo(x-15,y+20);
	ctx.strokeStyle = "black";
	ctx.stroke();

	ctx.beginPath();
	ctx.lineJoin = "round";
	ctx.lineWidth = 3;
	ctx.moveTo(x+15,y-20);
	ctx.lineTo(x+25,y-25);
	ctx.lineTo(x+20,y-15);
	ctx.strokeStyle = "black";
	ctx.stroke();

	ctx.beginPath();
	ctx.moveTo(x-15,y+20);
	ctx.lineTo(x+20,y-15);
	ctx.lineWidth = 3;
	ctx.strokeStyle = "black";
	ctx.stroke();
 }

 function draw8(ctx,x,y){       //space garbage
 	ctx.beginPath();
	ctx.arc(x,y,25,0,Math.PI*2,true);
	ctx.lineWidth = 1;
	ctx.strokeStyle = "black";
	ctx.stroke();

	ctx.beginPath();
	ctx.moveTo(x-20,y-5);
	ctx.lineTo(x-20,y+5);
	ctx.lineTo(x+20,y+5);
	ctx.lineTo(x+20,y-5);
	ctx.fillStyle = "red";
	ctx.fill();

	ctx.beginPath();
	ctx.moveTo(x-5,y-20);
	ctx.lineTo(x+5,y-20);
	ctx.lineTo(x+5,y+20);
	ctx.lineTo(x-5,y+20);
	ctx.fillStyle = "red";
	ctx.fill();

	ctx.beginPath();
	ctx.arc(x,y,6,0,Math.PI*2,true);
	ctx.fillStyle = "black";
	ctx.fill();

 }

 function draw9(ctx,x,y){   //a colorful planet
 	var grd=ctx.createLinearGradient(x-25,y-25,x+25,y+25);
	grd.addColorStop(0,"black");
	grd.addColorStop("0.2","#cc3300");
	grd.addColorStop("0.4","#0033cc");
	grd.addColorStop("0.6","#009933");
	grd.addColorStop("0.8","#ff0066");
	grd.addColorStop(1,"#ccccff");

	ctx.beginPath();
	ctx.arc(x,y,25,0,Math.PI*2,true);
	ctx.lineWidth = 2;
	ctx.strokeStyle = "black";
	ctx.stroke();
	ctx.fillStyle = grd;
	ctx.fill();
 }

 function draw10(ctx,x,y){   //a star surrounded by four little stars
 	ctx.beginPath();
	ctx.moveTo(x,y-25);
	ctx.lineTo(x-10,y-10);
	ctx.lineTo(x-25,y);
	ctx.lineTo(x-10,y+10);
	ctx.lineTo(x,y+25);  //fifth point
	ctx.lineTo(x+10,y+10);
	ctx.lineTo(x+25,y);
	ctx.lineTo(x+10,y-10);
	ctx.lineTo(x,y-25);

	ctx.stroke();
	ctx.fillStyle = "yellow";
	ctx.fill();

	ctx.beginPath();
	ctx.moveTo(x-17.5,y-25);
	ctx.lineTo(x-20,y-20);
	ctx.lineTo(x-25,y-17.5);
	ctx.lineTo(x-20,y-15);
	ctx.lineTo(x-17.5,y-10);
	ctx.lineTo(x-15,y-15);
	ctx.lineTo(x-10,y-17.5);
	ctx.lineTo(x-15,y-20);
	ctx.lineTo(x-17.5,y-25);
	ctx.stroke();
	ctx.fillStyle = "yellow";
	ctx.fill();

	ctx.beginPath();  //the second mini star
	ctx.moveTo(x+17.5,y-25);
	ctx.lineTo(x+20,y-20);
	ctx.lineTo(x+25,y-17.5);
	ctx.lineTo(x+20,y-15);
	ctx.lineTo(x+17.5,y-10);
	ctx.lineTo(x+15,y-15);
	ctx.lineTo(x+10,y-17.5);
	ctx.lineTo(x+15,y-20);
	ctx.lineTo(x+17.5,y-25);
	ctx.stroke();
	ctx.fillStyle = "yellow";
	ctx.fill();

	ctx.beginPath();  //the third mini star
	ctx.moveTo(x+17.5,y+25);
	ctx.lineTo(x+20,y+20);
	ctx.lineTo(x+25,y+17.5);
	ctx.lineTo(x+20,y+15);
	ctx.lineTo(x+17.5,y+10);
	ctx.lineTo(x+15,y+15);
	ctx.lineTo(x+10,y+17.5);
	ctx.lineTo(x+15,y+20);
	ctx.lineTo(x+17.5,y+25);
	ctx.stroke();
	ctx.fillStyle = "yellow";
	ctx.fill();

	ctx.beginPath();  //the forth mini star
	ctx.moveTo(x-17.5,y+25);
	ctx.lineTo(x-20,y+20);
	ctx.lineTo(x-25,y+17.5);
	ctx.lineTo(x-20,y+15);
	ctx.lineTo(x-17.5,y+10);
	ctx.lineTo(x-15,y+15);
	ctx.lineTo(x-10,y+17.5);
	ctx.lineTo(x-15,y+20);
	ctx.lineTo(x-17.5,y+25);
	ctx.stroke();
	ctx.fillStyle = "yellow";
	ctx.fill();
 }

function animate1(ctx,object){

	ctx.clearRect(object.x - 25, object.y - 25, 50,50);
 	
 	if(object.x > 974){
 		object.xspeed = -object.xspeed;
 		object.x += object.xspeed;
 	}else if(object.x < 26){
 		object.xspeed = -object.xspeed;
 		object.x += object.xspeed;
 	}else{
 		object.x += object.xspeed;
 	}

 	if(object.y > 614){
 		object.yspeed = -object.yspeed;
 		object.y += object.yspeed;
 	}else if(object.y < 26){
 		object.yspeed = -object.yspeed;
 		object.y += object.yspeed;
 	}else{
 		object.y += object.yspeed;
 	}

 	draw1(ctx,object.x,object.y);

 }


 function animate2(ctx,object){

 }
 function animate3(ctx,object){
 	
 }
 function animate4(ctx,object){
 	
 }
 function animate5(ctx,object){
 	
 }
 function animate6(ctx,object){
 	
 }
 function animate7(ctx,object){
 	
 }
 function animate8(ctx,object){
 	
 }
 function animate9(ctx,object){
 	
 }
 function animate10(ctx,object){
 	
 }


//----------------------------------------分割线---------------------------------------------------

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
	img.onload = function() {
		window.ctx.drawImage(img, Math.random()*1000, Math.random()*640);
	}
	var newBlackHole;
	if (rand > 0.5) { // blue, most frequent
		img.src = path_blue_hole;
		newBlackHole = new BlackHole(0);
	} else if (rand > 0.15) { // purple, infrequent
		img.src = path_purple_hole;
		newBlackHole = new BlackHole(1);
	} else { // black, rare
		img.src = path_black_hole;
		newBlackHole = new BlackHole(2);
	}
	img.onclick = function() {
		console.log("clicked!");
	}
	blackHoles.push(newBlackHole);
}

function onCanvasClicked(event) {
	console.log("canvas click");
}