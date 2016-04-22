
var mex_collection 		= [],
	cactus_collection 	= [];



define(function () {
	
return new Objects();
});



function Objects() {

	this.mex_arr;
	this.cact_arr;


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


function Mexican() {
	this.x = Math.random() * (300-20) + 20; 
	this.y = Math.random() * (300-20) + 20;
	this.circle = "hello";

}

function Cactus() {
	this.x;
	this.y;
}
