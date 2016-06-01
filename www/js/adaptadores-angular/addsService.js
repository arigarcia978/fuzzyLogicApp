angular.module('starter')
	.factory('addsService', [function(){
		var adaptadorPromociones = new AdaptadorPromociones();
		var lugarElegido;
	  	return {
	    	setLugar: function(lugar){
	    		lugarElegido = lugar;
	    	},
	    	getLugar:function(){
	    		return lugarElegido;
	    	}
	    }
	}]);