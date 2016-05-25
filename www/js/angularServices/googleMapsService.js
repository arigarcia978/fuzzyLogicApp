angular.module('starter')
	.factory('googleMaps', [function(){
	  var gooleMapsService = new GoogleMapsService();
	  var ubicacionActual;
	  return {
	    buscarLugaresCercanos: function(ubicacion) {
	      //return getLugaresCercanos(ubicacion);
	      return [];
	    },
	    getLugarActual: function(ubicacion){
	    	return ;
	    },
	    getUbicacionActual: function(){
	    	return gooleMapsService.getUbicacion();
	    },
	    setUbicacionActual: function(ubicacion) {
	    	ubicacionActual = ubicacion;
	    },
	    getUbicacionActual: function(){
	    	return ubicacionActual; 
	    }
	  }
	}]);