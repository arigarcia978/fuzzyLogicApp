angular.module('starter')
	.factory('addsService', [function(){
		var adaptadorPromociones = new AdaptadorPromociones();
	  	return {
	    	getPromocionAMostrar: function(lugarElegido){
	    		return adaptadorPromociones.getPromocion(lugarElegido);
	    	}
	    }
	}]);