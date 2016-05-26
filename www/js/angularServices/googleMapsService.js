angular.module('starter')
	.factory('googleMaps', [function(){
	  var googleMapsService = new AdaptadorGoogleMaps();
	  var ubicacionActual;
	  return {
	    buscarLugaresCercanos: function(ubicacion) {
	    	return googleMapsService.buscarTodosLosNegociosCercanos(ubicacion);
	    },
	    getLugarActual: function(ubicacion){
	    	return ;
	    },
	    //getUbicacionActual: function(){
	    //	return gooleMapsService.getUbicacion();
	    //},
	    setUbicacionActual: function(ubicacion) {
	    	ubicacionActual = ubicacion;
	    },
	    getUbicacionActual: function(){
	    	return ubicacionActual; 
	    }
	  }
	}]);