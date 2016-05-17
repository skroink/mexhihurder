define(function() {
	b = new Buff();
	b.id = "toupe";
	b.type = "buff";
	window.Buff = b;
	return window.document.dispatchEvent(window.buffLoaded);
})

function Buff() {
	this.id;
	this.active = false;
	this.type;
	this.x;
	this.y;
	this.bitmap;
	this.spriteData;
	this.effect;
	
	this.effects = {
		buff: {
			'toupe': function() {window.audio.control.play("beatmexico")},
			'eagle': function() {},
			'flag': function() {},
			'money': function() {}
		},
		debuff: {
			'cactus': function() {console.log('cactus');  },
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
		
		
}





