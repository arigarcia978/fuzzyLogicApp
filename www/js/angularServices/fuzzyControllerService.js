angular.module('starter')
	.factory('fuzzyControllerService', [function(){
	  return {
	    getPromocionesAOfrecer: function(entradas){
	    	var controladorDifuso = new ControladorDifuso();
	      	return controladorDifuso.seleccionarPromociones(entradas);
	    }
	  }
	}]);