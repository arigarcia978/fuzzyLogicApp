angular.module('starter')
	.factory('inferenceEngine', [function(){
	  return {
	    getPromocionesAOfrecer: function(nuevaUbicacion, lugaresCercanos){
	      return seleccionarPromociones(nuevaUbicacion, lugaresCercanos);
	    }
	  }
	}]);