angular.module('starter')
	.controller('MainController', ['$rootScope', '$scope','googleMaps',  function($rootScope, $scope, googleMaps){
		
		setInterval(getUbicacion, 5000);

		function getUbicacion(){
			var ubicacion = new Ubicacion(44.40338, 2.17403, new Date(2016, 5, 24, 16, 25, 0, 0));
			//$scope.ubicacion = new Ubicacion();
			$scope.ubicacion = googleMaps.getUbicacionActual(); //del gps o googlemaps
			$rootScope.$emit("actualizarUbicacion", ubicacion);
		}

	}]);