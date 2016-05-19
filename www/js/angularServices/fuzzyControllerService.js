angular.module('starter')
	.factory('fuzzyControllerService', [function(){
	  return {
	    getPromocionesAOfrecer: function(entradas){
	      return seleccionarPromociones(entradas);
	    }
	  }
	}]);