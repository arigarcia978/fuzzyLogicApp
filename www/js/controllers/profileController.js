angular.module('starter')
	.controller('ProfileController', ['userService', '$stateParams', '$scope', 'googleMaps',
		function(userService, $stateParams, $scope, googleMaps){
			var id = $stateParams.id;
			$scope.user = userService.getUsuario(id);
			console.log($scope.user);

			//seleccionarUbicaciones
			var ubicacion;
			var lugaresCercanos = googleMapsService.buscarLugaresCercanos(ubicacion);

			
		}
	]);