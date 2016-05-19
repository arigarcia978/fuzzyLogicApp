angular.module('starter')
	.controller('MainController', ['$rootScope', function($rootScope){
		
		setInterval(getUbicacion, 45000);
		
		function getUbicacion(){
			console.log('hola');
			//var ubicacion = getUbicacion(); //del gps o googlemaps
			//$rootScope.actualizarUbicacion(ubicacion); //actualizarubicacion recibe latitud y longitud
		}
	}]);