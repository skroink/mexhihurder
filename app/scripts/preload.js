define(function() {
	loadAssets()
	return;
})


var fs = require('fs');

window.preloads = {
	json: [],
	gfx: [],
	audio: []
};



function loadAssets() {
	fs.readdir("app/assets", function(err, files) {
		if (err) {
			console.log(err)
			return
		};



		files.forEach(function(f) {
			var extension = f.split('.').pop();

			if(extension == "json") {
				var fileDirect = "app/assets/"+f;
				var data = fs.readFileSync(fileDirect, "utf8");

				if(data.error) console.log(error);
				else {
					
					window.preloads.json.push(JSON.parse(data));
				}				
			};

			// if file is png or gif
			if(extension == "png" || extension == "gif") {
			var img_name = f,
				img_src = "assets/" + f,
				img_file = new createjs.Bitmap("assets" + "/" + f),
				file = {
					id: img_name,
					src: img_src,
					file: img_file
				};
			window.preloads.gfx.push(file);
			};

			var countAudio = function() {
				var number = files.filter(function(n){return n.split('.').pop() == "ogg"}).length;
				
				return number
			}
		

			// Audio files
			if(extension == "ogg") {
				var name = f.split('.')[0];
				sound = { id: name, src: f, track: null, statement: null };


				window.preloads.audio.push(sound);
				if(window.preloads.audio.length == countAudio())
					window.document.dispatchEvent(window.soundLoad);


			}

		})

		////////////////////////////////////////////////////////////////////////////////////
		/// dispatches custom event "load Complete"
		
		
		window.document.dispatchEvent(window.loadComplete);	
		//console.log(sounds);
	})
};



