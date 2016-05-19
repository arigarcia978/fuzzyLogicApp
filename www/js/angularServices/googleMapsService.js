angular.module('starter')
	.factory('googleMaps', [function(){
	  var ubicacionAnterior;
	  return {
	    buscarLugaresCercanos: function(ubicacion) {
	      return getLugaresCercanos(ubicacion);
	    },
	    getUltimaUbicacion: function(){
	      return ubicacionAnterior;
	    },
	    getLugarActual: function(ubicacion){
	    	return ;
	    }
	  }
	}]);