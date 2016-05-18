define(function() {
	window.audio = audio;
	console.log(window.audio);
	assignAudio();
})
//var sounds = window.preloads.audio;

var sounds = window.preloads.audio;

function assignAudio(audio) {
	
	for (sound in sounds) {
	sound = sounds[sound];
	var audioPath = "./assets/",
		audioElement = window.document.createElement('audio'),
		source = window.document.createElement('source');

	
	
	source.src = audioPath + sound.src;
	source.type = 'audio/ogg';
	audioElement.id = sound.id;
	window.document.body.appendChild(audioElement);
	audioElement.appendChild(source);
	
	var json = window.preloads.json[0]
	var filter = json.statements.filter(function(n) {
		return n.id == sound.id;
	});
	
	if(sound.id == 'bgm' )
		audioElement.loop = "loop";

	if(filter.length != 0)
	audioElement.title = filter[0].statement;
	
}};




 var audio = {
	control: {
	'play': function(track) {

		selectTrack(track).play();
	},

	'volume': function(track,volume) {
		selectTrack(track).volume = volume;
	},

	'pause' : function(track) {
		selectTrack(track).pause();
	},

	"select" : function(track) {
		return selectTrack(track);
	},
	"random" : function() {
		var select = sounds.filter(function(n) {
			return n.id != "bgm";
		});
		//select = select[Math.random(select.length)];
		console.log(select);
		select = sounds[Math.round(Math.random() * (select.length - 1))];
		selectTrack(select.id).play();
		console.log(selectTrack(select.id));
	}
}};

var selectTrack = function(audioTrack) {
	return window.document.getElementById(audioTrack);
};


