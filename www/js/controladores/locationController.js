angular.module('starter')
	.controller('LocationController', ['googleMaps', '$rootScope', 'fuzzyControllerService', 'userService',
		function(googleMaps, $rootScope, fuzzyControllerService, userService){
			var lugarActual;
			var ubicacionAnterior;
			var motorMatematico = new MotorMatematico();

			console.log('holi location');

			$rootScope.$on('actualizarUbicacion', function(){//o ubicacion
				ubicacionAnterior = userService.getUltimaUbicacion();
				var nuevaUbicacion = googleMaps.getUbicacionActual();
				var lugaresCercanos;										//Array de lugar (Del dominio)

				var seMovió = compararUbicaciones(ubicacionAnterior, nuevaUbicacion);

				//arreglar?
				if(seMovió) {
					console.log('se movió');
					lugarActual = googleMaps.getLugarActual(nuevaUbicacion);
					lugaresCercanos = googleMaps.buscarLugaresCercanos(nuevaUbicacion);
					var entradas = prepararEntradas(nuevaUbicacion, lugaresCercanos);

					fuzzyControllerService.getPromocionesAOfrecer(entradas);
					actualizarUltimaUbicacion(ubicacionAnterior, nuevaUbicacion);
				} else {
					console.log('no se movio');
					comprobarSiEsVisita(ubicacionAnterior, nuevaUbicacion);
				}
			});

			function compararUbicaciones(ubicacionAnterior, nuevaUbicacion){
				var distancia = motorMatematico.calcularDistanciaEnKMEntreUbicaciones(ubicacionAnterior, nuevaUbicacion);
				var distanciaEnMetros = motorMatematico.convertirKMaMetros(distancia);
				console.log('distancia' + distanciaEnMetros);
				if(distancia == 0){
				return false;
				} else return true;
			}

			function comprobarSiEsVisita(ubicacionAnterior, nuevaUbicacion){
				var diferencia = motorMatematico.tiempoTranscurridoEnHoras(ubicacionAnterior.getMomento(), nuevaUbicacion.getMomento());
				console.log(diferencia);

				//diferencia en horas
				if(diferencia > 0.25){
				//incrementar en 1 las visitas al lugar al actual
				}
			}

			function actualizarUltimaUbicacion(ubicacionAnterior, nuevaUbicacion){
				userService.actualizarUltimaUbicacion(nuevaUbicacion);
			}

			function prepararEntradas(ubicacion, lugaresCercanos){
				var entradas = {};

				entradas.nitidas = prepararEntradasNitidas();
				entradas.aFusificar = prepararEntradasDifusas();

				return entradas;
			}

			function prepararEntradasNitidas(){
				//pedir datos del perfil
			}

			function prepararEntradasDifusas(ubicacion, lugaresCercanos){
				var entradasDifusas = {};

				agregarDistanciasALugaresCercanos(ubicacion, lugaresCercanos); 
				agregarVisitasMensualesALugares(lugaresCercanos); 

				entradasDifusas.lugares = lugaresCercanos;
				entradasDifusas.velocidadDeMovimiento = calcularVelocidadDeMovimiento(ubicacion); // Es una sola variable

				return entradasDifusas;
			}

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
				return 1;
			}
		}]);