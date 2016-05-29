angular.module('starter')
	.controller('LocationController', [
		CONSTANTES.NOMBRE_FACTORY_GPS, 
		CONSTANTES.NOMBRE_FACTORY_PLACES,
		'googleMaps', 
		'$rootScope', 
		'fuzzyControllerService', 
		'userService', 
		'$stateParams', 
		'$scope', 
		function(servicioGPS, servicioGooglePlaces, googleMaps, $rootScope, fuzzyControllerService, userService, $stateParams, $scope){
			
			var ubicacionActual, lugaresCercanos;
			
			cargarInformacionDiferida(function(ubicacion, lugares) {
				ubicacionActual = ubicacion;
				lugaresCercanos = lugares;
			});

			function cargarInformacionDiferida(callback) {
				servicioGPS.getUbicacionActual(function(ubicacion) {
					servicioGooglePlaces.buscarLugaresCercanos(ubicacion, 'food', function(lugares) {
						//Los lugares vienen ordenados del mas cerca al mas lejos
						callback(ubicacion, lugares);
					});
				});
			}


			function mostrarUbicacionYLugares() {
				console.log('Entro...');
				console.log(ubicacionActual);
				console.log(lugaresCercanos);
				console.log('Salgo...');
			}

			/*
			var lugarActual;
			var ubicacionAnterior;
			var motorMatematico = new MotorMatematico();

			var id = $stateParams.id;
			$scope.user = userService.getUsuario(id);
			console.log($scope.user);
			actualizarUbicacion();
			*/

			//$rootScope.$on('actualizarUbicacion', function(){//o ubicacion
			function actualizarUbicacion(){
				ubicacionAnterior = userService.getUltimaUbicacion();
				//var nuevaUbicacion = googleMaps.getUbicacionActual();
				var nuevaUbicacion = new Ubicacion(41.50338, 2.17403, new Date(2016, 5, 24, 16, 40, 0, 0));
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
			}

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
				entradas.aFusificar = prepararEntradasDifusas(ubicacion, lugaresCercanos);

				return entradas;
			}

			function prepararEntradasNitidas(){
				//pedir datos del perfil
			}

			function prepararEntradasDifusas(ubicacion, lugaresCercanos){
				var entradasDifusas = {};

				agregarDistanciasALugaresCercanos(ubicacion, lugaresCercanos); 
				agregarVisitasMensualesALugares(lugaresCercanos);
				agregarMeGustaALugares(lugaresCercanos);

				entradasDifusas.lugares = lugaresCercanos;
				entradasDifusas.velocidadDeMovimiento = calcularVelocidadDeMovimiento(ubicacion); // Es una sola variable

				return entradasDifusas;
			}

			function agregarDistanciasALugaresCercanos(ubicacion, lugaresCercanos) {
				//Trabajando con el objeto lugar del dominio
				for (var i = 0; i < lugaresCercanos.length; i++) {
					var lugar = lugaresCercanos[i];
					lugar.setDistancia(calcularDistanciaAlLugarCercano(ubicacion, lugar.ubicacion));
				}
			}

			function agregarVisitasMensualesALugares(lugaresCercanos) {
				for (var i = 0; i < lugaresCercanos.length; i++) {
					var lugar = lugaresCercanos[i];
					lugar.setCantidadDeVisitasMensuales(calcularVisitasMensualesAlLugar(lugar.nombre));
				}
			}

			function agregarMeGustaALugares(lugaresCercanos){
				var meGustas = userService.getMeGustasDeUsuario(id);
				
				for(var j = 0; j < meGustas.length; j++){
					for (var i = 0; i < lugaresCercanos.length; i++) {
						var lugar = lugaresCercanos[i];
						if(meGustas[j] == lugar.nombre){
							console.log('holix');
							lugar.meGusta = true;
						}
					}
				}
			}

			function calcularVisitasMensualesAlLugar(lugar){
				return 6;
			}

			function calcularDistanciaAlLugarCercano(ubicacion, ubicacionLugar){
				return 55;
			}

			function calcularVelocidadDeMovimiento(ubicacion) {			
				return 1;
			}

		}]);