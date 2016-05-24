angular.module('starter')
	.factory('googleMaps', [function(){
	  return {
	    buscarLugaresCercanos: function(ubicacion) {
	      return getLugaresCercanos(ubicacion);
	    },
	    getLugarActual: function(ubicacion){
	    	return ;
	    },
	    getUbicacionActual: function(){
	    	return ;
	    }
	  }
	}]);