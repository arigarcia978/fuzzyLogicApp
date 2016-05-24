angular.module('starter')
	.controller('LocationController', ['googleMaps', '$rootScope', 'fuzzyControllerService', 'userService',
		function(googleMaps, $rootScope, fuzzyControllerService, userService){
			var lugarActual;

			$rootScope.$on('actualizarUbicacion', function(ubicacion){//o ubicacion
				console.log( "bai");
				var ubicacionAnterior = googleMaps.getUltimaUbicacion();
				var lugaresCercanos;										//Array de lugar (Del dominio)
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
			});

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

			function agregarVisitasMensualesALugares() {
				for (lugar in lugaresCercanos) {
					lugar.setCantidadDeVisitasMensuales(calcularVisitasMensualesAlLugar(lugar.nombre));
				}
			}

			function calcularVisitasMensualesAlLugar(lugaresCercanos){}

			function calcularDistanciaAlLugarCercano(ubicacion, ubicacionLugar){}

			function calcularVelocidadDeMovimiento(ubicacion) {			}
			}
	]);
