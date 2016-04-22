var canvas 		= window.document.getElementById("gameCanvas"),
	easeljs 	= requirejs('easeljs'),
	player;

// requirejs, define function. returns a function useable within a require scope.
// adds evenListener to keys pressed
// return the var player as new player object
define(function (data) {
	// eventListener on current document, on keydown. 
	// results in instatiation of doKeyDown() function.
	window.document.addEventListener("keydown",doKeyDown, true);
	return player = new player;
		});


// player object.
function player() {
	
	this.message = "hello"
	this.x = 800;
	this.y = 300;
	this.rad = 50;
	this.vx;
	this.vy;
	this.circle;
	this.speed = 10;	
		};


// function that take the parameter e (pressed key), and returns it 
// to keyAction() 
function doKeyDown(e) {
 			keyAction(e);		
 		};


// Function with switch, to differentiate between keys pressed,
// and adds/substracts to the x/y axis of the player module.
// based on the key pressed.
function keyAction(e){
	
	switch(e.keyCode) {
		// arrow 'left' : keycode 37
		case 37:
		console.log('left');
		player.circle.x -= player.speed;
			
			break;
		// arrow 'up' : keycode 38
		case 38:
		console.log('up');
		player.circle.y -= player.speed;
			
			break;
		// arrow 'right' : keycode 39
		case 39:
		console.log('right');
		player.circle.x += player.speed;
			
			break;
		// arrow 'down' : keycode 40
		case 40:
			console.log('down');
			player.circle.y += player.speed;
			
			break;
		default: 
			console.log("no corresponding action");

	};
};