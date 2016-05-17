 requirejs.config({

    baseUrl: "app",
    paths: {
    	easeljs: 'components/EaselJS/lib/easeljs-0.8.2.combined',
    	soundjs: 'components/SoundJS/lib/soundjs-NEXT.combined',
    	preloadjs: 'components/preloadjs/lib/preloadjs-0.6.2.combined',
    	scripts: 'scripts',
    	playerjs: 'scripts/player',
    	ndgmr: "components/Collision-Detection-for-EaselJS/src/ndgmr.Collision"
    }
});


 console.log("loaded config.js")


 //../components/EaselJS/easeljs-0.8.2.min