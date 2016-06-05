// handles all logic inside every 'tick'
var pushCount = 0;
var collisionjs = requirejs('ndgmr');
define(function() {
	console.log("canvas");
	return window.tickHandler = function(event) {
	if (window.createjs.Ticker.paused != true) {
		window.time.stampRun();
		var player = window.player;

		if(window.time.time == 120 || window.win.points == 7)
			window.reload();


		// player friction, smoother movement
		////////////////////////////////////////////////////////////////////////////////////
		//////////////////////////////////////////////////////////////////////////////////// 
		player.moveSpeed()
		
		////////////////////////////////////////////////////////////////////////////////////
		// wall collision detection => player
			var wall_player = ndgmr.checkPixelCollision(window.wall_Bitmap, player.bitmap, 0);
			if (wall_player) {
				var wall_mid = window.wall_Bitmap.x + (window.wall_Bitmap.image.width / 2);
				
				//console.log(player.bitmap.getBounds());
				
				if(wall_player.x < wall_mid)
					player.bitmap.x = (window.wall_Bitmap.x - 64*2);


				if(wall_player.x > wall_mid)
					player.bitmap.x = (window.wall_Bitmap.x + 64*2);
				

				
			};


		for (var i in window.time.timeStamps) {
			if(window.time.timeStamps[i].active == true ){
			var buff = window.time.timeStamps[i];

			var collision = ndgmr.checkPixelCollision(player.bitmap, buff.buff.bitmap, 0);
			if(collision) {
				buff.checked = true;
				window.stage.removeChild(buff.buff.bitmap);
				buff.buff.run();
			}
			

			}
		}
		window.time.timeStamps = window.time.timeStamps.filter(function(n){return n.checked != true});


		////////////////////////////////////////////////////////////////////////////////////
		// Mexican Tick Handler for each in mexicans array
		for (var i in window.mexicans) {
			var mexican = window.mexicans[i];
			
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
				pushFeedBack();
			}};

				/////////////////////////////////////////////////////////////////////
				/// increase x,y position by velocity
				/// and increase velX by 0.11 by each iteration.
				/// Also moves mexican in "random" directions based
				/// on placement from mid of canvas.
				mexican.move(window.canvas.height);

				/////////////////////////////////////////////////////////////////////
				/// limits the movement of mexican
				/// this includes border detection 
				/// and speed limitation 
				mexican.moveLimiter(window.canvas.height);
				



			//////////////////////////////////////////////////////////////////////////
			/// wall collision detection => mexican
			var wall_obj = ndgmr.checkPixelCollision(window.wall_Bitmap, mexican.bitmap, 0);
			if (wall_obj) {

				var wallMid = window.wall_Bitmap.x + (window.wall_Bitmap.image.width / 2);

				if(wall_obj.x < wallMid){
					mexican.bitmap.x = (window.wall_Bitmap.x - 64*2);
					mexican.velX *= -1;
				}
			};

			/////////////////////////////////////////////////////////////////////////////////
			/// toggle death flag if x position i greater than width of canvas - (64*3)
			/// 64*3 = 3 lengths of sprite frame (bitmap size)
			if ((mexican.bitmap.x) > (window.stage.canvas.width - (64*3))) {
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
		var prev_ = window.mexicans.length;
		window.mexicans = window.mexicans.filter(function(n){return n.dead != true});
		//console.log(prev_);
		if(prev_ > window.mexicans.length) {
			window.win.points += 1;
			window.audio.control.play("icreatedagreatwall");
		};



		////////////////////////////////////////////////////////////////////////////////////
		/// updates win.window.text based on win.points 
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
		window.text.text = (120 - window.time.time) + "s";

		

		////////////////////////////////////////////////////////////////////////////////////
		/// updates canvas by each tick. 
		window.stage.update();
	}
};
})



function pushFeedBack() {
	pushCount++;
	console.log(pushCount);
	if(pushCount >= 15){
		
		var rSound = window.audio.control.random();
		pushCount = 0;
	}
} 