var canvas = window.document.getElementById("gameCanvas");
//var ctx = c.getContext("2d");

// createjs resource
var easeljs = requirejs('easeljs');
var soundjs = requirejs('soundjs');
var preloadjs = requirejs('preloadjs');

var stage;
var text;



function init() {
	console.log("initiating");
	stage = new createjs.Stage(canvas);
	createjs.Ticker.addEventListener("tick", stage);
	console.log(stage)
	stage.canvas.width = window.innerWidth - 16;
	stage.canvas.height = window.innerHeight - 16;

	var foo = new createjs.LoadQueue();



	var img = new createjs.Bitmap("assets/13.jpg");
	//img.onload = setImg(img);
	//img.src = 
	stage.addChild(img);	
	img.x = canvas.width / 3;
	img.y = canvas.height / 3;
	stage.update();

	

	}


	
window.document.onload = init();





