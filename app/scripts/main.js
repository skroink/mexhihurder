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
	gameLoop,
	text,
	mexicans=[],
	player_obj;

	createjs.Ticker.paused = true;

function getIndex(val) {
    for (var i = 0; i < gfx.length; i++) {
        if (gfx[i].id === val) {
            
            return i;
        }
    }
};




// loads player object 
function loadPlayer() {
 requirejs(["scripts/player"], function (player){
 	//console.log(gfx);
// 	player.circle = new createjs.Shape();
//	player.circle.graphics
//	.beginFill('red').drawCircle(player.x,player.y,player.rad);

 	
 	
 	

	//player.circle = gfx[getIndex("player.gif")].file; 		
	player.circle = new createjs.Bitmap(gfx[getIndex("player.gif")].src);

	player.circle.x = player.x;
	player.circle.y = player.y;

	player.circle.scaleX = 0.5;
	player.circle.scaleY = 0.5;
	stage.addChild(player.circle);
 	stage.update();
 	
	
	console.log(player.circle.x);


	
	//attachBitmap()

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
//		mexican.circle = new createjs.Shape();
//		mexican.circle.graphics
//		.beginFill("purple").drawCircle(mexican.x,mexican.y,mexican.radius);
		

		mexican.circle = new createjs.Bitmap(gfx[getIndex("object.png")].src);
		mexican.circle.x = mexican.x;
		mexican.circle.y = mexican.y;
		console.log(mexican.circle.x + " " + mexican.circle.y);
		stage.addChild(mexican.circle);
		stage.update();
		
		mexicans.push(mexican);
		

	} 

	
})};


function prepCanvas(data) {
	data.width = window.innerWidth - 16;
	data.height = window.innerHeight - 32;



	
	primaryFunctions();
	createjs.Ticker.useRAF = true;
	createjs.Ticker.setFPS(60);
}



function primaryFunctions() {
	console.log("loading primary functions");
	stage.onload = drawBG();
	drawBG.onload = loadObjects();
	loadObjects.onload = loadPlayer();

	
}


// initates the canvas, and objects related.
// overall start process.
function init() {
	

	stage = new createjs.Stage(canvas);
	preload = new createjs.LoadQueue(false);
	startDate = (new Date()).getTime();
	//
	


	loadBitmaps('app/assets');
	
	loadBitmaps.onload = prepCanvas(stage.canvas);
	
	
	createjs.Ticker.addEventListener("tick", tickHandler);
	//console.log(createjs.Ticker.getMeasuredFPS());
	text = new createjs.Text("hello","bold 40px Arial", "#ff7700");
	text.textAlign = "right";
	text.x = stage.canvas.width;
	stage.addChild(text);
	primaryFunctions.onload = toggleTick();
	



	

	

};

function toggleTick() {
	text.text = "please wait"
	window.setTimeout(function() {createjs.Ticker.paused = !createjs.Ticker.paused;}, 1250);
	
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


		console.log(collision);
};
		 mexican.circle.x += mexican.velX;
		 
		 stage.update();


		
	
		 mexican.velX += 0.01;

	}

	var currentTime = (new Date()).getTime();
	var time = Math.floor((currentTime-startDate)/1000);
	
	text.text = (120 - time) + "s";
	
	
	
}

}


function loadImages() {
	




}



function drawBG() {
	var bg = new createjs.Shape();
	bg.graphics
	.beginFill('blue').drawRect(0,0,canvas.width,120)
	.beginFill('yellow').drawRect(0,120,200,canvas.height)
	.beginFill('green').drawRect(200,120,canvas.width,canvas.height);
	stage.addChild(bg);
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



window.document.onload = init();


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
		console.log(gfx);
	})


}