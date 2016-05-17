// custom event for stack loading
window.loadComplete = new window.CustomEvent(
	"assets", {
		detail: {
			message: "all loaded",
			time: new Date(),
		},
		bubbles: true,
		cancelable: true
	}
);



window.soundLoad = new window.CustomEvent(
	"soundsLoaded", {
		detail: {
			message: "hello"
		},
		bubbles: true,
		cancelable: true
	}
	);

window.buffLoaded = new window.CustomEvent(
	"buffLoaded", {
		detail: {
			message: "hello"
		},
		bubbles: true,
		cancelable: true
	}
	);
