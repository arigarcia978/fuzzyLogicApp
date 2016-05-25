angular.module('starter')
	.controller('LocationController', ['googleMaps', '$rootScope', 'fuzzyControllerService', 'userService',
		function(googleMaps, $rootScope, fuzzyControllerService, userService){
			var lugarActual;
			var motorMatematico = new MotorMatematico();

			$rootScope.$on('actualizarUbicacion', function(nuevaUbicacion){//o ubicacion
				console.log( "bai");
				var ubicacionAnterior = userService.getUltimaUbicacion();
				console.log(nuevaUbicacion);
				console.log(ubicacionAnterior.getLatitud());
				var lugaresCercanos;										//Array de lugar (Del dominio)

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
			});

			function compararUbicaciones(ubicacionAnterior, nuevaUbicacion){
				var distancia = motorMatematico.calcularDistanciaEnKMEntreUbicaciones(ubicacionAnterior, nuevaUbicacion);

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
				var entradas = {};

				agregarDistanciasALugaresCercanos(ubicacion, lugaresCercanos); 
				agregarVisitasMensualesALugares(lugaresCercanos); 

				entradas.lugares = lugaresCercanos;
				entradas.velocidadDeMovimiento = calcularVelocidadDeMovimiento(ubicacion); // Es una sola variable

				return entradas;
			};

			function agregarDistanciasALugaresCercanos(ubicacion, lugaresCercanos) {
				//Trabajando con el objeto lugar del dominio
				for (lugar in lugaresCercanos) {
					lugar.setDistancia(calcularDistanciaAlLugarCercano(ubicacion, lugar.ubicacion));
				}
			}

			function agregarVisitasMensualesALugares(lugaresCercanos) {
				for (lugar in lugaresCercanos) {
					lugar.setCantidadDeVisitasMensuales(calcularVisitasMensualesAlLugar(lugar.nombre));
				}
			}

			function calcularVisitasMensualesAlLugar(lugaresCercanos){}

			function calcularDistanciaAlLugarCercano(ubicacion, ubicacionLugar){
				return 0;
			}

			function calcularVelocidadDeMovimiento(ubicacion) {			
				return 10;
			}
		}]);