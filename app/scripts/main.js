var canvas = window.document.getElementById("gameCanvas");

// createjs resource
var easeljs = requirejs('easeljs'),
	soundjs = requirejs('soundjs'),
	preloadjs = requirejs('preloadjs'),
	collisionjs = requirejs('ndgmr'),
	// node modules (file reading) 
	fs = require('fs'),
	path = require('path'),



	stage,
	preload,
	sounds,
	gfx,
	json = [],
	gameLoop = false,
	text,
	mexicans = [],
	wall_Bitmap;



	// GLOBALS
	window.win = {points: 0,
				  text: 0 };
	window.player;

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
	};


createjs.Ticker.paused = true;

function loadBuffs() {
	requirejs(["scripts/buffs"], function() {
		
		buffs = window.buffs;
		buffs.construct(2);


		for (buff in buffs.array) {
			buff = buffs.array[buff];
			console.log(buff);
			
			buff.spriteData.images = [gfx[getIndex("objects_spritesheet.png")].src];
			
			buff.spriteData.frames = {
				width: 66,
				height: 66
			};
			buff.spriteData.animations = {
				toupe:7,
				eagle:8,
				flag:6,
				money:9,
				cactus:2,
				tequila:1,
				taco:4,
				chili:0,
				tomato:3
			};
			buff.spritesheet = new createjs.SpriteSheet(buff.spriteData);
			buff.bitmap = new createjs.Sprite(buff.spritesheet, buff.id)
		};



		console.log(window.buffs);
	});
};	

// loads player object 
function loadPlayer() {
	requirejs(["scripts/player"], function(p) {


		p.spriteData.images = [gfx[getIndex("trump_spritesheet.png")].src];
		p.spriteData.frames = {
			width: 66,
			height: 66
		};
		p.spriteData.animations = {
			stand: 2,
			wkUp: [3, 5],
			wkRight: [6, 8],
			wkDown: [0, 2],
			wkLeft: [9, 11],
		};

		console.log(p.spriteData);

		p.spritesheet = new createjs.SpriteSheet(p.spriteData);
	

		

		p.bitmap = new createjs.Sprite(p.spritesheet, "stand");
		p.bitmap.framerate = 1000;
		

		p.bitmap.x = p.x;
		p.bitmap.y = p.y;

		p.bitmap.scaleX = 2;
		p.bitmap.scaleY = 2;
		stage.addChild(p.bitmap);
		

		window.player = p;
		
		console.log();

		// apply player to objects
		for (var i in mexicans) {
			var mexican = mexicans[i];
			mexican.player = window.player;
		};

	});
};

// loads various game objects (mexican, cactus, buffs etc.)
function loadObjects() {
	

	
		requirejs(["scripts/mexicans"], function(m) {
	
		m.construct(5);

		for (var i in m.list) {
			var mexican = m.list[i];
			mexican.spriteData.images = [gfx[getIndex("mexican_spritesheet.png")].src];
			mexican.spriteData.frames = {
				width: 66,
				height: 66
			};
			mexican.spriteData.animations = {
			stand: 2,
			wkUp: [3, 5],
			wkRight: [6, 8],
			wkDown: [0, 2],
			wkLeft: [9, 11],
			};

			//console.log(player.spriteData);

			mexican.spritesheet = new createjs.SpriteSheet(mexican.spriteData);
			//console.log(player.spritesheet);

			//player.bitmap = new createjs.Bitmap(gfx[getIndex("player.gif")].src);

			mexican.bitmap = new createjs.Sprite(mexican.spritesheet, "stand");

			//	mexican.bitmap = new createjs.Bitmap(gfx[getIndex("object.png")].src);
			mexican.bitmap.x = mexican.x;
			mexican.bitmap.y = mexican.y;
			mexican.bitmap.scaleY = 2;
			mexican.bitmap.scaleX = 2;
			stage.addChild(mexican.bitmap);
			

			mexicans.push(mexican);


		}
		
	})


	
	
};

function prepCanvas() {
	



	createjs.Ticker.useRAF = true;
	createjs.Ticker.setFPS(60);

	console.log("loading primary functions");
	drawBG();
	loadBuffs();
	drawBG.onload = loadObjects();
	loadObjects.onload = loadPlayer();
	toggleTick();
}


// initates the canvas, and objects related.
// overall start process.
function init() {

	
	stage = new createjs.Stage(canvas);
	preload = new createjs.LoadQueue(false);
	createjs.Sound.alternateExtensions = ["mp3"];
	

	window.document.addEventListener("assets", function(){
		gfx = window.preloads.gfx;
		prepCanvas();
	});

	window.document.addEventListener("soundsLoaded", function(evt) {
			sounds = window.preloads.audio;
			console.log(window.preloads);
			requirejs(["scripts/audio"]);
			
	});


	createjs.Ticker.addEventListener("tick", tickHandler);

};





// Pauses/ Unpauses the canvas tick element
function toggleTick() {

	text.text = "please wait"


	if (createjs.Ticker.paused == true) {
		text.text = 'press any key to continue';
		window.setTimeout(function() {
			window.document.addEventListener('keydown', function() {
				createjs.Ticker.paused = false;

				if (gameLoop != true) {
					window.time.startDate = (new Date()).getTime();
					//window.audio.control.random();
					stage.canvas.width = 992;
					stage.canvas.height = 752;
					window.buffs.array[0].run();
					//window.audio.control.play("bgm");
					//window.audio.control.volume("bgm", 0.2);
					
				}
				gameLoop = true;
				
				window.document.removeEventListener('keydown');

			})

		}, 1250);
	} else createjs.Ticker.paused = !createjs.Ticker.paused;


	//window.setTimeout(function() {createjs.Ticker.paused = !createjs.Ticker.paused;}, 1250);



}

// handles all logic inside every 'tick'
function tickHandler(event) {

	if (createjs.Ticker.paused != true) {

		var player = window.player;
		// player friction, smoother movement
		////////////////////////////////////////////////////////////////////////////////////
		//////////////////////////////////////////////////////////////////////////////////// 
		player.moveSpeed()
	
		////////////////////////////////////////////////////////////////////////////////////
		// wall collision detection => player
			var wall_player = ndgmr.checkPixelCollision(wall_Bitmap, player.bitmap, 0);
			if (wall_player) {
				var wall_mid = wall_Bitmap.x + (wall_Bitmap.image.width / 2);
				
				//console.log(player.bitmap.getBounds());
				
				if(wall_player.x < wall_mid)
					player.bitmap.x = (wall_Bitmap.x - 64*2);


				if(wall_player.x > wall_mid)
					player.bitmap.x = (wall_Bitmap.x + 64*2);
				

				
			};



		////////////////////////////////////////////////////////////////////////////////////
		// Mexican Tick Handler for each in mexicans array
		for (var i in mexicans) {
			var mexican = mexicans[i];
			


			////////////////////////////////////////////////////////////////////////////////////
			// collision detection => player
			if (player.bitmap != null) {
				var collision = ndgmr.checkPixelCollision(mexican.bitmap, player.bitmap, 0);
				if (collision) {

					playerMid = {
					x: player.bitmap.x + player.bitmap.getBounds().width / 2,
					y: player.bitmap.y + player.bitmap.getBounds().width / 2
				}; 
				var xDiff = playerMid.x - collision.x,
				yDiff = playerMid.y - collision.y;


				if(Math.abs(xDiff) > Math.abs(yDiff)) {

					var xOut;
					if(xDiff < 0) {
						xOut = 20;
					} else {
						xOut = -20
					};


					mexican.bitmap.x += xOut;
					mexican.velX *= -1.25;
				} 
					else {
						var yOut;
						if(yDiff < 0) {
							yOut = 20;
						} else {
							yOut = -20
						};
					mexican.bitmap.y += yOut;
					mexican.velY *= -1.25;
				}
			}};

				/////////////////////////////////////////////////////////////////////
				/// increase x,y position by velocity
				/// and increase velX by 0.11 by each iteration.
				/// Also moves mexican in "random" directions based
				/// on placement from mid of canvas.
				mexican.move(canvas.height);

				/////////////////////////////////////////////////////////////////////
				/// limits the movement of mexican
				/// this includes border detection 
				/// and speed limitation 
				mexican.moveLimiter(canvas.height);
				



			//////////////////////////////////////////////////////////////////////////
			/// wall collision detection => mexican
			var wall_obj = ndgmr.checkPixelCollision(wall_Bitmap, mexican.bitmap, 0);
			if (wall_obj) {

				var wallMid = wall_Bitmap.x + (wall_Bitmap.image.width / 2);

				if(wall_obj.x < wallMid){
					mexican.bitmap.x = (wall_Bitmap.x - 64*2);
					mexican.velX *= -1;
				}

				



			};

			/////////////////////////////////////////////////////////////////////////////////
			/// toggle death flag if x position i greater than width of canvas - (64*3)
			/// 64*3 = 3 lengths of sprite frame (bitmap size)
			if ((mexican.bitmap.x) > (stage.canvas.width - (64*3))) {
				mexican.dead = true;
				
			};
			/////////////////////////////////////////////////////////////////////////////////
			/// animate mexican spritesheet
			mexican.animate();	

	};
		////////////////////////////////////////////////////////////////////////////////////
		/// calculates which mexicans have a death flag set to true
		/// filters all true flags out of array.
		/// also adds "1" point to win.point
		var prev_ = mexicans.length;
		mexicans = mexicans.filter(function(n){return n.dead != true});
		if(prev_ > mexicans.length) {
			window.win.points += 1;
		};



		////////////////////////////////////////////////////////////////////////////////////
		/// updates win.text based on win.points 
		window.win.text.text = window.win.points + " pts."


		////////////////////////////////////////////////////////////////////////////////////
		/// updates timer
		/// this is based on startDate and the new value "currentTime"
		/// divides by "1000" to convert "time" to seconds.
		if(window.time.loop != false) {
			window.time.currentTime = (new Date()).getTime() - window.time.pausedTime;
			//window.time.startDate = window.time.pausedTimesed
		window.time.time = Math.floor((window.time.currentTime - window.time.startDate) / 1000);
	} else {
		window.time.pausedTime = (new Date()).getTime() - window.time.currentTime;
	}
		text.text = (120 - window.time.time) + "s";

		

		////////////////////////////////////////////////////////////////////////////////////
		/// updates canvas by each tick. 
		stage.update();
	}
};



function attachBitmap(img, object) {
	console.log(img);
	object = new createjs.Bitmap(img);
	console.log(image);
	stage.addChild(image);
	//image.x = canvas.width / 3;
	//image.y = canvas.height / 3;	
	
}


// draws background
// and attaches the text for score
function drawBG() {
	var bg = new createjs.Bitmap(gfx[getIndex("canvas.png")].src);
	wall_Bitmap = new createjs.Bitmap(gfx[getIndex("collision_wall.png")].src);
	wall_Bitmap.x = 701;
	//wall_Bitmap.regX = wall_Bitmap.width / 2;
	stage.addChild(bg);
	stage.addChild(wall_Bitmap);
	text = new createjs.Text("hello", "bold 40px Arial", "#000");
	text.textAlign = "left";
	text.x = 0;
	stage.addChild(text);

	window.win.text = new createjs.Text("points","bold 40px Arial", "#000");
	window.win.text.textAlign = "left";
	window.win.text.y = 45;
	stage.addChild(window.win.text);
	

}

// gets index of gtx, based on 'id' parameter
function getIndex(id) {
	for (var i = 0; i < gfx.length; i++) {
		if (gfx[i].id === id) {

			return i;
		}
	}
};



requirejs(["scripts/listeners"]);
requirejs(["scripts/preload"]);
init()

