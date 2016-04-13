var c = document.getElementById("gameCanvas");
var ctx = c.getContext("2d");
console.log("hello world")

function init() {
	c.width = window.innerWidth - 16;
	c.height = window.innerHeight - 16;
	console.log("updated");
}

init();