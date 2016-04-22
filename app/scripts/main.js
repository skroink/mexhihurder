var canvas = window.document.getElementById("gameCanvas");

	// createjs resource
var easeljs 	= requirejs('easeljs'),
 	soundjs 	= requirejs('soundjs'),
 	preloadjs 	= requirejs('preloadjs'),
 	// node modules (file reading) 
 	fs 			= require('fs'),
 	path 		= require('path'),



	stage,
	preload,
	gfx=[],
	deadline,
	text,
	mexicans=[];




function loadPlayer() {
 requirejs(["scripts/player"], function (player){
 
 	player.circle = new createjs.Shape();
	player.circle.graphics
	.beginFill('red').drawCircle(player.x,player.y,player.rad);
 	
 	stage.addChild(player.circle);
 	stage.update();
 	
 	
 	});
};


requirejs(["scripts/gameObjects"], function (Object) {
	Object.populate_mex(3);
	
	for(var i in Object.mex_arr) {
		var mexican = Object.mex_arr[i];
		mexican.circle = new createjs.Shape();
		mexican.circle.graphics
		.beginFill("purple").drawCircle(mexican.x,mexican.y,50);

		stage.addChild(mexican.circle);
		stage.update();
		
		mexicans.push(mexican);

	}

	console.log(mexicans);
});





// initates the canvas, and objects related.
// overall start process.
function init() {
	console.log("initiating");
	stage = new createjs.Stage(canvas);
	preload = new createjs.LoadQueue(false);
	createjs.Ticker.addEventListener("tick", tickHandler);
	createjs.Ticker.addEventListener("tick", stage);
	createjs.Ticker.setFPS(30);
	console.log(stage)
	stage.canvas.width = window.innerWidth - 16;
	stage.canvas.height = window.innerHeight - 32;
	drawBG();
	loadPlayer();
	

	window.document.addEventListener('click',function() {
		//loadImages();
		window.document.removeEventListener("click");
	});

	
	

};


function tickHandler(event) {
	for(var i in mexicans) {
		
		mexicans[i].circle.x += 5;
		//var mexican = mexican[i].circle;
		//mexican.x +=1; 
	}
	stage.update();


}


function loadImages() {
	


	preload.addEventListener("complete", function(evt){
	var img =preload.getItem("13");
	console.log("hello");
	});


	preload.on("error", loadError);

	
	preload.loadFile({id:"13", src:"assets/13.jpg"});
	preload.load();
	console.log(preload);
	var image = new createjs.Bitmap(preload.getItem("13").src);
	//
	//
	//var image = new createjs.Bitmap("assets/13.jpg");
	console.log(image);
	stage.addChild(image);
	image.x = canvas.width / 3;
	image.y = canvas.height / 3;	
	//stage.update();
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
	




function loadBitmap(img) {
	console.log(img);
	var image = new createjs.Bitmap(img);
	console.log(image);
	stage.addChild(image);
	image.x = canvas.width / 3;
	image.y = canvas.height / 3;	
	stage.update();
}



window.document.onload = init();