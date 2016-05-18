define(function() {
	loadAssets()
	return;
});

var fs = require('fs');
window.preloads = {
	json: [],
	gfx: [],
	audio: []
};

function loadAssets() {
	var loadbar = window.document.getElementById("splashLoad");

	fs.readdir("app/assets", function(err, files) {
		if (err) {
			console.log(err)
			return
		};
		loadbar.max = files.length;
		
		
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
		timeOut();
		////////////////////////////////////////////////////////////////////////////////////
		/// dispatches custom event "load Complete"
		function timeOut() {
		setTimeout(function() {
			if(loadbar.value < loadbar.max){
			   loadbar.value ++;
			   timeOut();

			}
			else{
				window.document.getElementById("splashText").innerHTML = "press any key to continue";
				window.document.dispatchEvent(window.loadComplete);	
			}
		},100)
	};

		
		//console.log(sounds);
	})
};



