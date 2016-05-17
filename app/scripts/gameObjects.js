
var mex_collection 		= [];



define(function () {

return new Objects();
});



function Objects() {
	
	this.mex_arr;
	this.spritesheet;
	this.populate_mex = function(i_num) {
		for(var i = 0; i < i_num; i++) {
		mex_collection.push(new Mexican);		
			};
		this.mex_arr = mex_collection;
	};

	
	


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
	this.bitmap;
	this.radius = 20;
	this.speed = 4;
	this.player;
	this.dead = false;
	this.spriteData = {
		images:[],
		frames: {},
		animations: {}
	};	


	this.animate = function() {
		
		if(this.dead != true) {
			if(Math.abs(this.velX) > Math.abs(this.velY)) {
			if(this.velX > 0) {
				this.bitmap.gotoAndPlay("wkRight");
			} else {
				this.bitmap.gotoAndPlay("wkLeft");
			}
		} else {
			if(this.velY > 0) {
				this.bitmap.gotoAndPlay("wkDown");
			} else {
				this.bitmap.gotoAndPlay("wkUp");
			}
		}
	} else if(this.dead == true)
		this.bitmap.gotoAndPlay("stand");
	};
	

	this.move = function(canvasHeight) {
		this.bitmap.x += this.velX;
		this.bitmap.y += this.velY;
		this.velX += 0.11;

		// "random Movement" or circular movement
		//  mexicans always migrate to middle of canvas.
		if ((this.bitmap.y) > (canvasHeight / 2) - 50) {
				// randomizes velocity
				this.velY += Math.random() * (-1.3) + 0.209;
				
			};


			if (this.bitmap.y < (canvasHeight / 2) + 50) {
				this.velY += Math.random() * (1.3) - 0.209;
				
			}
	};



	this.moveLimiter = function(canvasHeight) {
		
			


			////////////////////////////////////////////////////////////////////////////////
			/// border detection
			if (this.bitmap.x < 0 + 32) {
				this.bitmap.x = 32;
				this.velX = -this.velX;

			};


			if (this.bitmap.y < 0 + 32) {
				this.bitmap.y = 32;
				this.velY = -this.velY;

			};

			if (this.bitmap.y > canvasHeight - ((64*2)-32)) {
				this.bitmap.y = canvasHeight - (64*2)-32;
				this.velY = -this.velY;
				
			}


			// speed limiter
			// limits the velocity (x,y) 
			// to static var speed
			if(this.velX > this.speed)
			this.velX = this.speed;

			if(this.velY > this.speed)
			this.velY = this.speed;

		}};



