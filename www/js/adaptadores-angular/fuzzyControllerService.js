angular.module('starter')
	.factory('fuzzyControllerService', ['addsService', function(addsService){
	  return {
	    getPromocionesAOfrecer: function(entradas){
	    	var controladorDifuso = new ControladorDifuso();
	    	var lugarElegido = controladorDifuso.seleccionarPromociones(entradas);
	    	return lugarElegido;
	      	//return addsService.getPromocionAMostrar(lugarElegido);
	    }
	  }
	}]);