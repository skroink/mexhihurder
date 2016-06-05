window.canvas = window.document.getElementById("gameCanvas");

// window.createjs resource
var easeljs = requirejs('easeljs'),
	soundjs = requirejs('soundjs'),
	preloadjs = requirejs('preloadjs'),
	// node modules (file reading) 
	fs = require('fs'),
	path = require('path'),

	preload,
	sounds,
	gfx,
	json = [],
	gameLoop = false,
	active_buffs = [];


	// GLOBALS
	window.text;
	window.win = {points: 0,
				  text: 0 };
	window.player;
	window.window.wall_Bitmap;
	window.createjs = createjs;
	window.time = {
		startDate: undefined,
		currentTime: undefined,
		time: undefined,
		loop: true,
		pausedTime: 0,
		pause: function() {
			if(window.time.loop != false){
				window.time.loop = false;
			}else 
			if(window.time.loop != true){
				
				window.time.loop = true;
				
			}},
		timeStamps: [],
		stampRun: function() {
			

				for(i in window.time.timeStamps) {
				try{
					i = window.time.timeStamps[i];
					if(i.active != true)
					{	
						if(i.timeStamp == window.time.time) {
						i.active = true;
						window.stage.addChild(i.buff.bitmap);
						}
					}
				}catch(err){return}
			};
		}
	};

	window.mexicans = [];

 
window.createjs.Ticker.paused = true;

window.stage = new window.createjs.Stage(window.canvas);





window.reload = function() {

	//window.audio.control.pause("bgm");

	var playing = window.document.body.getElementsByTagName('audio');

	for(item in playing){
		item = playing[item];
		
		if(item.currentTime > 0) {
			console.log(item.id)
			window.audio.control.pause(item.id);
			item.currentTime = 0;
		}
	}

	window.stage.canvas.width = 0;
	window.stage.canvas.height = 0;
	window.toggleTick();
	window.player = undefined;
	window.stage.removeAllChildren();
	window.stage.clear()
	window.buffs.array = [];
	window.time.timeStamps = [];

	window.win = {points: 0,
				  text: 0 };




	init();

}

function prepCanvas() {
	window.createjs.Ticker.useRAF = true;
	window.createjs.Ticker.setInterval(20);


	drawBG();
	requirejs(["scripts/Objects"]);
	window.toggleTick();
}


// initates the canvas, and objects related.
// overall start process.
function init() {

	
	
	preload = new window.createjs.LoadQueue(false);
	window.createjs.Sound.alternateExtensions = ["mp3"];
	if(gameLoop == true) {
		prepCanvas();
		requirejs(["scripts/audio"]);		
	}


	


	window.document.addEventListener("assets", function(){
		gfx = window.preloads.gfx;
		prepCanvas();
	});

	window.document.addEventListener("soundsLoaded", function(evt) {
			sounds = window.preloads.audio;
			console.log(window.preloads);
			requirejs(["scripts/audio"]);
			
	});

	if(gameLoop == true)
	{
		gameLoop = false;
	}

	requirejs(["scripts/canvas"], function(e) {
		window.tickHandler = e;
		//console.log(window.tickHandler);
		window.createjs.Ticker.addEventListener("tick", window.tickHandler);
	});
	


};



function menu(e) {
if(e.keyCode == 27) {
	window.toggleTick();
	window.document.getElementById("menu").style.visibility = "visible";
	window.time.pause();
	}
	
}

// Pauses/ Unpauses the canvas tick element
window.toggleTick = function() {

	window.text.text = "please wait"


	if (window.createjs.Ticker.paused == true) {
		window.text.text = 'press any key to continue';
		window.setTimeout(function() {
			window.document.addEventListener('keydown', function() {
				window.createjs.Ticker.paused = false;

				if (gameLoop != true) {
					window.time.startDate = (new Date()).getTime();
					//window.audio.control.random();
					window.document.addEventListener("keyup", menu);
					window.stage.canvas.width = 992;
					window.stage.canvas.height = 752;
					window.audio.control.play("bgm");
					window.audio.control.volume("bgm", 0.1);
					
					
				}
				gameLoop = true;
				
				window.document.removeEventListener('keydown');

			})

		}, 1250);
	} else window.createjs.Ticker.paused = !window.createjs.Ticker.paused;


	//window.setTimeout(function() {window.createjs.Ticker.paused = !window.createjs.Ticker.paused;}, 1250);



}








// draws background
// and attaches the window.text for score
function drawBG() {
	var bg = new window.createjs.Bitmap(gfx[window.getIndex("canvas.png")].src);
	window.wall_Bitmap = new window.createjs.Bitmap(gfx[window.getIndex("collision_wall.png")].src);
	window.wall_Bitmap.x = 701;
	//window.wall_Bitmap.regX = window.wall_Bitmap.width / 2;
	window.stage.addChild(bg);
	window.stage.addChild(window.wall_Bitmap);
	window.text = new window.createjs.Text("hello", "bold 40px Arial", "#000");
	window.text.textAlign = "left";
	window.text.x = 0;
	window.stage.addChild(window.text);

	window.win.text = new window.createjs.Text("points","bold 40px Arial", "#000");
	window.win.text.textAlign = "left";
	window.win.text.y = 45;
	window.stage.addChild(window.win.text);
	

}

// gets index of gtx, based on 'id' parameter
 window.getIndex = function(id) {
	for (var i = 0; i < gfx.length; i++) {
		if (gfx[i].id === id) {

			return i;
		}
	}
};



requirejs(["scripts/listeners"]);
requirejs(["scripts/preload"]);
init()

