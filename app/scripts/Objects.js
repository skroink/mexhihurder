define(function () {
		loadBuffs();
		loadBuffs.onload = loadMexicans();
		loadMexicans.onload = loadPlayer();
		});


// loads player object 
function loadPlayer() {
	requirejs(["scripts/player"], function(p) {


		p.spriteData.images = [window.preloads.gfx[window.getIndex("trump_spritesheet.png")].src];
		p.spriteData.frames = {
			width: 66,
			height: 66
		};
		p.spriteData.animations = {
			stand: 2,
			wkUp: [3, 5],
			wkRight: [6, 8],
			wkDown: [0, 2],
			wkLeft: [9, 11],
		};

		console.log(p.spriteData);

		p.spritesheet = new createjs.SpriteSheet(p.spriteData);
	

		

		p.bitmap = new createjs.Sprite(p.spritesheet, "stand");
		p.bitmap.framerate = 1000;
		

		p.bitmap.x = p.x;
		p.bitmap.y = p.y;

		p.bitmap.scaleX = 1.5;
		p.bitmap.scaleY = 1.5;
		window.stage.addChild(p.bitmap);
		

		window.player = p;
		
		console.log();

		// apply player to objects
		for (var i in window.mexicans) {
			var mexican = window.mexicans[i];
			mexican.player = window.player;
		};

	});
};




// loads various game objects (mexican, cactus, buffs etc.)
function loadMexicans() {
	

	
		requirejs(["scripts/mexicans"], function(m) {
		console.log(m);
		m.list = [];
		m.construct(7);

		for (var i in m.list) {
			var mexican = m.list[i];
			mexican.spriteData.images = [window.preloads.gfx[window.getIndex("mexican_spritesheet.png")].src];
			mexican.spriteData.frames = {
				width: 66,
				height: 66
			};
			mexican.spriteData.animations = {
			stand: 2,
			wkUp: [3, 5],
			wkRight: [6, 8],
			wkDown: [0, 2],
			wkLeft: [9, 11],
			};

			//console.log(player.spriteData);

			mexican.spritesheet = new createjs.SpriteSheet(mexican.spriteData);
			//console.log(player.spritesheet);

			//player.bitmap = new createjs.Bitmap(gfx[window.getIndex("player.gif")].src);

			mexican.bitmap = new createjs.Sprite(mexican.spritesheet, "stand");

			//	mexican.bitmap = new createjs.Bitmap(gfx[window.getIndex("object.png")].src);
			mexican.bitmap.x = mexican.x;
			mexican.bitmap.y = mexican.y;
			mexican.bitmap.scaleY = 1.4;
			mexican.bitmap.scaleX = 1.4;
			window.stage.addChild(mexican.bitmap);
			

			window.mexicans.push(mexican);



		}
		
	})
};

function loadBuffs() {
	requirejs(["scripts/buffs"], function() {
		
		buffs = window.buffs;
		buffs.construct(2);


		for (buff in buffs.array) {
			buff = buffs.array[buff];
			console.log(buff);
			
			buff.spriteData.images = [window.preloads.gfx[window.getIndex("objects_spritesheet.png")].src];
			
			buff.spriteData.frames = {
				width: 66,
				height: 66
			};
			buff.spriteData.animations = {
				toupe:7,
				eagle:8,
				flag:6,
				money:9,
				cactus:2,
				tequila:1,
				taco:4,
				chili:0,
				tomato:3
			};
			buff.spritesheet = new createjs.SpriteSheet(buff.spriteData);
			buff.bitmap = new createjs.Sprite(buff.spritesheet, buff.id)

			buff.bitmap.x = Math.round(Math.random() * (701-64));
			buff.bitmap.y = Math.round(Math.random() * 700);

		};



		console.log(window.buffs);
	});
};	