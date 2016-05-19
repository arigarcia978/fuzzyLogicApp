angular.module('starter')
	.controller('LocationController', ['googleMaps', '$rootScope', function(googleMaps, $rootScope){
	  $rootScope.actualizarUbicacion = function(latitud,longitud){//o ubicacion
	  	var nuevaUbicacion = new Ubicacion(latitud, longitud);
	    var ubicacionAnterior = googleMaps.getUltimaUbicacion();
	  	var lugaresCercanos;
	  	var lugarActual;
	    var motorMatematico = new MotorMatematico();
		
		var seMovió = compararUbicaciones(ubicacionAnterior, nuevaUbicacion);

		//arreglar?
	    if(seMovió) {
	    	lugarActual = googleMaps.getLugarActual(nuevaUbicacion);
	    	lugaresCercanos = googleMaps.buscarLugaresCercanos(nuevaUbicacion);
	      	getPromocionesAOfrecer(nuevaUbicacion, lugaresCercanos);
	      	actualizarUltimaUbicacion();
	    } else {
	    	comprobarSiEsVisita();
	    }
	  }

	  function compararUbicaciones(ubicacionAnterior, nuevaUbicacion){
	  	var distancia = motorMatematico.calcularDistancia(ubicacionAnterior, nuevaUbicacion);

	  	if(distancia == 0){
	  		return false;
	  	} else return true;
	  }

	  function comprobarSiEsVisita(ubicacionAnterior, nuevaUbicacion){
	  	var direncia = motorMatematico.calcularDiferenciaDeTiempoEnMinutos();
	  	if(diferencia > 20){
	  		//incrementar en 1 las visitas al lugar al actual
	  	}
	  }
	}]);
