
var mex_collection 		= [],
	cactus_collection 	= [];



define(function () {
	
return new Objects();
});



function Objects() {
	
	this.mex_arr;
	this.cact_arr;
	this.spritesheet;

	this.populate_mex = function(i_num) {
		for(var i = 0; i < i_num; i++) {
		mex_collection.push(new Mexican);		
			};
		this.mex_arr = mex_collection;
	}

	this.populate_cactus = function(i_num) {
		for(var i = 0; i < i_num; i++ ) {
		cactus_collection.push(new Cactus)
			};
		this.cact_arr = cactus_collection;
	}




};

var maxX = 992/2,
	minX = 132

	maxY = 752,
	minY = 132;

function Mexican() {
	this.x = Math.random() * (maxX - minX) + minX; 
	this.y = Math.random() * (maxY - minY) + minY;
	this.velX = 1;
	this.velY = 1;
	this.circle = "hello";
	this.radius = 20;
	this.player;
	this.dead = false;
	this.spriteData = {
		images:[],
		frames: {},
		animations: {}
	};	
	
}

function Cactus() {
	this.x;
	this.y;
}
