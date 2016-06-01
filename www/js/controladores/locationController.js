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
		'addsService',
		function(servicioGPS, servicioGooglePlaces, googleMaps, $rootScope, fuzzyControllerService, userService, $stateParams, $scope, servicioPromocion){
			
			console.log('LEANDRO ES UN CURIOSO');

			var ubicacionActual, lugaresCercanos, usuarioActual;
			
			cargarInformacionDiferida(function() {
				actualizarUbicacion();
			});

			function cargarInformacionDiferida(callback) {
				var cargados = 0;
				servicioGPS.getUbicacionActual(function(ubicacion) {
					servicioGooglePlaces.buscarLugaresCercanos(ubicacion, 'food', function(lugares) {
						//Los lugares vienen ordenados del mas cerca al mas lejos
						ubicacionActual = ubicacion;
						lugaresCercanos = lugares;
						cargados++;
						cargados++;
					});
				});

				var id = $stateParams.id;
				userService.getUsuario(id, function(usuario){
					$scope.user = usuario;
					usuarioActual = usuario;
					cargados++;
				});

				if (cargados === 3) {
					callback();
				}


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


			$scope.edad = usuarioActual.getEdad();
			
			//actualizarUbicacion()
			//$rootScope.$on('actualizarUbicacion', function(){//o ubicacion
			function actualizarUbicacion(){
				console.log(ubicacionActual);
				//ubicacionAnterior = userService.getUltimaUbicacion();
				var ubicacionAnterior = new Ubicacion(-26.8308402, -65.2051408, new Date(2016, 5, 24, 16, 40, 0, 0));
				servicioGPS.getUbicacionActual(function(nuevaUbicacion) {
				console.log(ubicacionAnterior);
				console.log(nuevaUbicacion);
				console.log($scope.user);
				//var nuevaUbicacion = googleMaps.getUbicacionActual();
				$scope.ubicacionNueva = nuevaUbicacion;
				var lugaresCercanos;										//Array de lugar (Del dominio)
				var seMovió = compararUbicaciones(ubicacionAnterior, nuevaUbicacion);
				//arreglar?
				if(seMovió) {
					console.log('se movió');
					lugarActual = googleMaps.getLugarActual(nuevaUbicacion);
					googleMaps.buscarLugaresCercanos(nuevaUbicacion, function(lugares){
						lugaresCercanos = lugares;
					});
					console.log(lugaresCercanos);
					var entradas = prepararEntradas(nuevaUbicacion, ubicacionAnterior, lugaresCercanos);
					var lugarElegido = fuzzyControllerService.getPromocionesAOfrecer(entradas);
					servicioPromocion.setLugar(lugarElegido);
					//$scope.promocion = fuzzyControllerService.getPromocionesAOfrecer(entradas);
					//console.log('promocion' + $scope.promocion);
					actualizarUltimaUbicacion(ubicacionAnterior, nuevaUbicacion);
				} else {
					console.log('no se movio');
					comprobarSiEsVisita(ubicacionAnterior, nuevaUbicacion);
				}
				});
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
				agregarMeGustaALugares(lugaresCercanos);

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
					lugar.setCantidadDeVisitasMensuales(calcularVisitasMensualesAlLugar(lugar));
				}
			}

			function agregarMeGustaALugares(lugaresCercanos){
				var meGustas = usuarioActual.getMeGustanEnFB();
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
				var visitas;
				userService.getVisitasALugar(usuarioActual, lugar, function(datos){ 
					visitas = datos;
				});
			}

			function calcularDistanciaAlLugarCercano(ubicacion, ubicacionLugar){
				var distanciaEnKM = motorMatematico.calcularDistanciaEnKMEntreUbicaciones(ubicacion, ubicacionLugar);
				var distanciaEnMetros = motorMatematico.convertirKMaMetros(distanciaEnKM)
				return distanciaEnMetros;
			}

			function calcularVelocidadDeMovimiento(nuevaUbicacion, ubicacionAnterior) {
				//ni idea si esta bien hecha la funcion jeje
				var velocidad = motorMatematico.calcularVelocidadDeMovimiento(nuevaUbicacion, ubicacionAnterior);
				console.log('velocidad:'+velocidad);
				return velocidad;
			}

		}]);