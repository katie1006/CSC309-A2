// global variables
var currentState = 0;
var timerMethod;
var timerCount = 60;
var paused = false;

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
			timerMethod = setInterval(clock, 1000);
		}
	}
}

function pause() {
	if (paused) {
		$('#overlay').toggleClass('hide show');
		timerMethod = setInterval(clock, 1000);
		
		$('#pause_button').html('Pause');
		paused = false;
	} else  {
		var rect = document.getElementById('view_port').getBoundingClientRect();
		$('#overlay').toggleClass('hide show').css('left', (rect.left-6.5)+"px");
		clearInterval(timerMethod);
		
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