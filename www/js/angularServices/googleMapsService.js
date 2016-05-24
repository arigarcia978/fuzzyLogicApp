angular.module('starter')
	.factory('googleMaps', [function(){
	  var gooleMapsService = new GoogleMapsService()
	  return {
	    buscarLugaresCercanos: function(ubicacion) {
	      //return getLugaresCercanos(ubicacion);
	      return [];
	    },
	    getLugarActual: function(ubicacion){
	    	return ;
	    },
	    getUbicacionActual: function(){
	    	return  gooleMapsService.getUbicacion();
	    }
	  }
	}]);