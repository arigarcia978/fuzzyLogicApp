angular.module('starter')
	.controller('LocationController', ['googleMaps', '$rootScope', 'fuzzyControllerService', 
		function(googleMaps, $rootScope, fuzzyControllerService){
		  var lugarActual;

		  $rootScope.actualizarUbicacion = function(latitud,longitud){//o ubicacion
		  	var nuevaUbicacion = new Ubicacion(latitud, longitud);
		    var ubicacionAnterior = googleMaps.getUltimaUbicacion();
		  	var lugaresCercanos;
		  	var motorMatematico = new MotorMatematico();
			
			var seMovió = compararUbicaciones(ubicacionAnterior, nuevaUbicacion);

			//arreglar?
		    if(seMovió) {
		    	lugarActual = googleMaps.getLugarActual(nuevaUbicacion);
		    	lugaresCercanos = googleMaps.buscarLugaresCercanos(nuevaUbicacion);
				var entradas = prepararEntradas(nuevaUbicacion, lugaresCercanos);

		      	fuzzyControllerService.getPromocionesAOfrecer(entradas);
		      	actualizarUltimaUbicacion(ubicacionAnterior, nuevaUbicacion);
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

		  function actualizarUltimaUbicacion(ubicacionAnterior, nuevaUbicacion){
		  	//mandarle al googleMaps que haga ubicacionAnterior = nuevaUbicacion?
		  }

		  function prepararEntradas(ubicacion, lugaresCercanos){
			calcularVelocidadDeMovimiento(ubicacion);
			calcularDistanciasALugaresCercanos(ubicacion, lugaresCercanos);
			calcularVisitasMensualesALugares(lugaresCercanos);

			return entradas;
		  };

		  function calcularVelocidadDeMovimiento() {}

		  function calcularVisitasMensualesALugares(lugaresCercanos){}

		  function calcularDistanciasALugaresCercanos(ubicacion, lugaresCercanos){}
		}
	]);
