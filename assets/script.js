$(document).ready(function() {
	if (typeof(Storage) !== "undefined") {
		/* use this variable currentState to control what scene to show
			0 -> start page
			1 -> level 1 game page
			2 -> level 1 finish page
			3 -> level 2 game page
			4 -> level 2 finish page
		*/
		localStorage.currentState = 0;
	}
});

function switchScene() {
	if (localStorage.currentState == 4) { // finished game, restart
		console.log('game finished');
		
		// TODO: update scene back to the start page
		document.getElementById('page_title').innerHTML = 'Solar Game';
		document.getElementById('page_button').innerHTML = 'START';
		// insert top scores
		
		localStorage.currentState = 0;
	} else {
		console.log('change game/summary scene');
		// switch first, then update
		$('#transition_page').toggleClass('hide show');
		$('#game_page').toggleClass('hide show');
		localStorage.currentState++;
		
		if (localStorage.currentState == 2) {
			// switched to level 1 summary page
			document.getElementById('page_title').innerHTML = ('Level# 1');
			document.getElementById('page_button').innerHTML = 'NEXT';
			
		} else if (localStorage.currentState == 4) {
			// switched to level 2 summary page
			document.getElementById('page_title').innerHTML = ('Level# 2');
			document.getElementById('page_button').innerHTML = 'FINISH';
			
		} else { // 1 or 3
			// switched to game page
			
		}
	}
}