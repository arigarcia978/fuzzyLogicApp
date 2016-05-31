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
			*/
			var motorMatematico = new MotorMatematico();

			var id = $stateParams.id;
			$scope.user = userService.getUsuario(id);
			console.log($scope.user);
			actualizarUbicacion();


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
					var entradas = prepararEntradas(nuevaUbicacion, ubicacionAnterior, lugaresCercanos);

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

			function prepararEntradas(nuevaUbicacion, ubicacionAnterior, lugaresCercanos){
				var entradas = {};

				prepararEntradasNitidas(lugaresCercanos);
				entradas = prepararEntradasDifusas(nuevaUbicacion, ubicacionAnterior, lugaresCercanos);

				return entradas;
			}

			function prepararEntradasNitidas(lugaresCercanos){
				agregarMeGustaALugares(lugaresCercanos);
			}

			function prepararEntradasDifusas(nuevaUbicacion, ubicacionAnterior, lugaresCercanos){
				var entradas = {};

				agregarDistanciasALugaresCercanos(nuevaUbicacion, lugaresCercanos); 
				agregarVisitasMensualesALugares(lugaresCercanos);

				entradas.lugares = lugaresCercanos;
				entradas.velocidadDeMovimiento = calcularVelocidadDeMovimiento(nuevaUbicacion, ubicacionAnterior); // Es una sola variable

				return entradas;
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
							lugar.meGusta = true;
						}
					}
				}
			}

			function calcularVisitasMensualesAlLugar(lugar){
				return userService.getVisitasALugar(id, lugar);
			}

			function calcularDistanciaAlLugarCercano(ubicacion, ubicacionLugar){
				var distanciaEnKM = motorMatematico.calcularDistanciaEnKMEntreUbicaciones(ubicacion, ubicacionLugar);
				var distanciaEnMetros = motorMatematico.convertirKMaMetros(distanciaEnKM)
				return distanciaEnMetros;
			}

			function calcularVelocidadDeMovimiento(nuevaUbicacion, ubicacionAnterior) {
				//ni idea si esta bien hecha la funcion jeje
				var velocidad = motorMatematico.calcularVelocidadDeMovimiento(nuevaUbicacion, ubicacionAnterior);
				console.log(velocidad);
				return velocidad;
			}

		}]);