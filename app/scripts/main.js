var c = window.document.getElementById("gameCanvas");
var ctx = c.getContext("2d");
var easel = requirejs('easel');
function init() {
	c.width = window.innerWidth - 16;
	c.height = window.innerHeight - 16;
	console.log("initiated");

	
}


init();