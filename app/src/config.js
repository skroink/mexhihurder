 require.config({
    baseUrl: "src",
    paths: {
    	easeljs: 'components/EaselJS/easeljs-0.8.2.min'
    },

    shim: {
    	easeljs: {
    		exports: 'createjs.EaselJS'
    	}
    }
});