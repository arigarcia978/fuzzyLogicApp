angular.module('starter')
	.factory('addsService', [function(){
		var adaptadorPromociones = new AdaptadorPromociones();
		var lugarElegido;
	  	return {

	    	getPromocionAMostrar: function(lugarElegido){
	    		return adaptadorPromociones.getPromocion(lugarElegido);
	    	},
	    	setLugar: function(lugar){
	    		lugarElegido = lugar;
	    	},
	    	getLugar:function(){
	    		return lugarElegido;
	    	}
	    }
	}]);