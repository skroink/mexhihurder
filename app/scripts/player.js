var canvas 		= window.document.getElementById("gameCanvas"),
	easeljs 	= requirejs('easeljs'),
	keys 		= {},
	player;

// requirejs, define function. returns a function useable within a require scope.
// adds evenListener to keys pressed
// return the var player as new player object
define(function (data) {
	// eventListener on current document, on keydown. 
	// results in instatiation of doKeyDown() function.
	window.document.addEventListener("keydown",doKeyDown, true);
	window.document.addEventListener("keyup", doKeyUp, true);
	return player = new player;
		});


// player object.
function player() {
	
	this.message = "hello"
	this.x = 400;
	this.y = 300;
	this.rad = 50;
	this.vx = 0;
	this.vy = 0;
	this.circle;
	this.speed = 8;
	this.friction = 0.98;
	this.accel = 1.5;

	this.spriteData = {
		images:[],
		frames: {},
		animations: {}
	};	
		};


// function that take the parameter e (pressed key), and returns it 
// to keyAction() 
function doKeyDown(e) {
 	keys[e.which] = true;
 	keyAction(keys);		
 };
function doKeyUp(e) {

	if(e.keyCode == 37 || e.keyCode == 39)
	player.vx *= 0.05;
	
	if(e.keyCode == 38 || e.keyCode == 40)
	player.vy *= 0.05;

	delete keys[e.which]

	if(Object.keys(keys).length == 0)
		player.circle.gotoAndPlay("stand");

	//console.log(keys);
};


// Function with switch, to differentiate between keys pressed,
// and adds/substracts to the x/y axis of the player module.
// based on the key pressed.
function keyAction(e){
	for(var key in e){
	


		
		
		// left 
		if(key == 37 && player.vx > -player.speed){
			//console.log('left');
			player.vx =-8; 
			player.circle.gotoAndPlay("wkLeft");
		};
		// up
		if(key == 38 && player.vy > -player.speed){
			//console.log('up');
			player.vy=-8;
			player.circle.gotoAndPlay("wkUp");
		};
		// right
		if(key == 39 && player.vx < player.speed){
			//console.log('right');
			player.vx=8;
			player.circle.gotoAndPlay("wkRight");
		};
		// down
		if(key == 40 && player.vy < player.speed){
			//console.log('down');
			player.vy=8;
			player.circle.gotoAndPlay("wkDown");	
		};
	};
};