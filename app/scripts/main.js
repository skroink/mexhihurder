var canvas = window.document.getElementById("gameCanvas");

	// createjs resource
var easeljs 	= requirejs('easeljs'),
 	soundjs 	= requirejs('soundjs'),
 	preloadjs 	= requirejs('preloadjs'),
 	collisionjs = requirejs('ndgmr'),
 	// node modules (file reading) 
 	fs 			= require('fs'),
 	path 		= require('path'),



	stage,
	preload,
	startDate,
	gfx=[],
	gameLoop=false,
	text,
	mexicans=[],
	player_obj;

	createjs.Ticker.paused = true;


// gets index of gtx, based on 'id' parameter
function getIndex(id) {
    for (var i = 0; i < gfx.length; i++) {
        if (gfx[i].id === id) {
            
            return i;
        }
    }
};



// loads player object 
function loadPlayer() {
 requirejs(["scripts/player"], function (player){


 	player.spriteData.images = [gfx[getIndex("trump_spritesheet.png")].src];
 	player.spriteData.frames = {width:66, height:66};
 	player.spriteData.animations  = {stand: 0,
 									 wkUp:1,
 									 wkRight:2,
 									 wkDown:3,
 									 wkLeft:4,
 									};

 	console.log(player.spriteData);

 	player.spritesheet = new createjs.SpriteSheet(player.spriteData);
 	//console.log(player.spritesheet);

	//player.circle = new createjs.Bitmap(gfx[getIndex("player.gif")].src);

	player.circle = new createjs.Sprite(player.spritesheet, "stand");
	//player.circle.animation("stand");
	
	player.circle.x = player.x;
	player.circle.y = player.y;

	player.circle.scaleX = 2;
	player.circle.scaleY = 2;
	stage.addChild(player.circle);
 	stage.update();
 	

 	player_obj = player.circle;
 	console.log(player_obj);

 	// apply player to objects
 	for (var i in mexicans) {
 		var mexican = mexicans[i];
 		mexican.player = player;
 	};
 	
 	});
};

// loads various game objects (mexican, cactus, buffs etc.)
function loadObjects() {
requirejs(["scripts/gameObjects"], function (Object) {
	Object.populate_mex(5);
	
	for(var i in Object.mex_arr) {
		var mexican = Object.mex_arr[i];
		mexican.spriteData.images = [gfx[getIndex("mexican_spritesheet.png")].src];
 		mexican.spriteData.frames = {width:66, height:66};
 		mexican.spriteData.animations  = {stand: 0,
 										 wkUp:1,
 										 wkRight:2,
 										 wkDown:3,
 										 wkLeft:4,
 											};

 	//console.log(player.spriteData);

 	mexican.spritesheet = new createjs.SpriteSheet(mexican.spriteData);
 	//console.log(player.spritesheet);

	//player.circle = new createjs.Bitmap(gfx[getIndex("player.gif")].src);

	mexican.circle = new createjs.Sprite(mexican.spritesheet, "stand");

	//	mexican.circle = new createjs.Bitmap(gfx[getIndex("object.png")].src);
		mexican.circle.x = mexican.x;
		mexican.circle.y = mexican.y;
		mexican.circle.scaleY = 2;
		mexican.circle.scaleX= 2;
		stage.addChild(mexican.circle);
		stage.update();
		
		mexicans.push(mexican);
		

	} 

	
})};


function prepCanvas(data) {
	data.width = 992;
	data.height = 752;

	
	window.document.addEventListener("assets",function() {primaryFunctions()});
	
	createjs.Ticker.useRAF = true;
	createjs.Ticker.setFPS(60);

	
	
}



function primaryFunctions() {
	console.log("loading primary functions");
	drawBG();
	drawBG.onload = loadObjects();
	loadObjects.onload = loadPlayer();
	toggleTick();

	
}


// initates the canvas, and objects related.
// overall start process.
function init() {
	

	stage = new createjs.Stage(canvas);
	preload = new createjs.LoadQueue(false);
	
	//
	


	loadBitmaps('app/assets');
	
	prepCanvas(stage.canvas);
	
	
	createjs.Ticker.addEventListener("tick", tickHandler);
	//console.log(createjs.Ticker.getMeasuredFPS());
	
	



	

	

};




function toggleTick() {
	
	text.text = "please wait"


	if (createjs.Ticker.paused == true) {
		text.text = 'press any key to continue';
		window.setTimeout(function() {
			window.document.addEventListener('keydown', function() {
				createjs.Ticker.paused = false;

				if(gameLoop != true) {startDate = (new Date()).getTime();}
				gameLoop = true;
				window.document.removeEventListener('keydown');
				
			})

		}, 1250);
	} else createjs.Ticker.paused = !createjs.Ticker.paused;


	//window.setTimeout(function() {createjs.Ticker.paused = !createjs.Ticker.paused;}, 1250);
	

	
}


function tickHandler(event) {
	
	if(createjs.Ticker.paused != true) {
	for(var i in mexicans) {
		var mexican = mexicans[i];
		
		
		//var mexican = mexican[i].circle;
		//mexican.x +=1; 
		//
		//
		if(player_obj != null) {
		var collision = ndgmr.checkPixelCollision(mexican.circle,player_obj,0);
		if(collision){
			mexican.circle.x -= 20;
			mexican.velX *= -1,75;
			
		}


		//console.log(collision);
};
		 mexican.circle.x += mexican.velX;
		 mexican.circle.y += mexican.velY;
		 stage.update();

		 
		 	if((mexican.circle.y) > (canvas.height/2)-50){ 
		 		//mexican.velY += -1.01;
		 		mexican.velY += Math.random() * (-1.3) +0.209;
		 		//console.log("more than");
		 	};


		 	if(mexican.circle.y < (canvas.height/2)+50){ 
		 		//mexican.velY += 1.01;
		 		mexican.velY += Math.random() * (1.3) -0.209;
		 		//console.log("less than");
		 	};
		 	
		 
		 	
		
		 mexican.velX += 0.11;

	}

	var currentTime = (new Date()).getTime();
	var time = Math.floor((currentTime-startDate)/1000);
	
	text.text = (120 - time) + "s";
	
	
	
}};





function drawBG() {
	var bg = new createjs.Bitmap(gfx[getIndex("canvas.png")].src);
	stage.addChild(bg);
	text = new createjs.Text("hello","bold 40px Arial", "#000");
	text.textAlign = "left";
	text.x = 0;
	stage.addChild(text);
	stage.update();

}
	




function attachBitmap(img, object) {
	console.log(img);
	object = new createjs.Bitmap(img);
	console.log(image);
	stage.addChild(image);
	//image.x = canvas.width / 3;
	//image.y = canvas.height / 3;	
	stage.update();
}

function loadBitmaps() {
	fs.readdir("app/assets",function(err, files) {
		if(err) {console.log(err)
			return };
		files.forEach(function(f) {
			var img_name = f,
				img_src  = "assets/"+f,
				img_file = new createjs.Bitmap("assets"+"/"+f),
				file = {
					id: img_name, 
					src: img_src,
					file: img_file
				};

				
					gfx.push(file);

				
		})
		window.document.dispatchEvent(loadComplete);
		console.log(gfx);
	})
}


// custom event for stack loading
var loadComplete = new window.CustomEvent(
	"assets", 
	{
		detail: {
			message: "Hello World!",
			time: new Date(),
		},
		bubbles: true,
		cancelable: true
	}
);

window.document.onload = init();