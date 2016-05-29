angular.module('starter').factory('googleMaps', [function(){
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

angular.module(CONSTANTES.NOMBRE_MODULO)
   .factory(CONSTANTES.NOMBRE_FACTORY_PLACES, function() {

      var places = new AdaptadorGooglePlaces();

      return {
         buscarLugaresCercanos: function(ubicacion, tipo, callback) {
				places.buscarTodosLosNegociosCercanos(ubicacion, tipo, function(lugares) {
					callback(lugares);
				});
			}
      }

   });