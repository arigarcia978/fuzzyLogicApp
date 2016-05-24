angular.module('starter')
	.controller('MainController', ['$rootScope', 'googleMaps', function($rootScope, googleMaps){
		
		setInterval(getUbicacion, 5000);
		
		function getUbicacion(){
			console.log('hola');
			var ubicacion = new Ubicacion(44.40338, 2.17403, new Date(2016, 5, 24, 16, 25, 0, 0));
			//var ubicacion = googleMaps.getUbicacion(); //del gps o googlemaps
			$rootScope.$emit("actualizarUbicacion", ubicacion);
		}
	}]);