window.buffs = {
	'array' : [],
	'construct' : construct
};

function construct(pos,neg) {
	var lastBuff,
		lastDebuff;
	for (i = 0; i < pos; i++) {
		b = new Buff();
		b.type="buff";
		var list = ['toupe','eagle','flag','money'];
		if(lastBuff != undefined){
			list = list.filter(function(n) {
				return n != lastBuff;
			});
		}
		list = list[Math.round(Math.random() * (list.length - 1))];
		b.id = list;
		lastBuff = list;

		window.buffs.array.push(b);
	}

	for (i = 0; i < neg; i++) {
		b = new Buff();
		b.type="debuff";
		var list = ['cactus','tequila','taco','chili','tomato'];
		list = list[Math.round(Math.random() * (list.length - 1))];
		if(lastBuff != undefined){
			list = list.filter(function(n) {
				return n != lastDebuff;
			});
		}
		b.id = list;
		window.buffs.array.push(b);
	}	

	for (buff in window.buffs.array)
	{
		
		var counter = buff +1; 
		var stampCount = window.time.timeStamps.length + 1;

		//buffCount += 1;

		var min = stampCount * counter,
			max = (stampCount * counter) + 15;

		

		 var stamp =  {
			timeStamp : Math.round(Math.random() * (max - min) + min),
			buff : window.buffs.array[buff],
			active : false
		};


		console.log(stamp);
		//console.log(window.buffs.array[buff]);

		window.time.timeStamps.push(stamp);
		//console.log(window.time);
		//var timeStamp = Math.round(Math.random() * ());
	}
}


function Buff() {
	this.id;
	this.active = false;
	this.type;
	this.x;
	this.y;
	this.bitmap;
	this.spriteData = {
		images:[],
		frames: {},
		animations: {}
	};
	this.effect;
	
	this.effects = {
		buff: {
			'toupe': function() {window.audio.control.play("beatmexico")},
			'eagle': function() {window.audio.control.play("runningnotrunning")},
			'flag': function() {window.audio.control.play("bestpresident")},
			
			'money': function() {window.audio.control.play("reallyrich")}

								
		},
		debuff: {
			'cactus': function() {},
			'tequila': function(){},
			'taco': function() {},
			'chili': function() {},
			'tomato': function() {}
		}
	};

};


Buff.prototype.run = function() {

		try {
		switch(this.type) {
			case "buff":
			this.active = true;
			this.effects.buff[this.id]();
			break;
			case "debuff":
			this.active = true;
			this.effects.debuff[this.id]();
			break;
			default:

			}
		} catch(err){
			console.log(err);
		}		
};





