angular.module('starter')
	.controller('ProfileController', ['userService', '$stateParams', '$scope', 
		function(userService, $stateParams, $scope){
			console.log('jejejejjee');
			var id = $stateParams.id;
			$scope.user = userService.getUsuario(id);
			console.log($scope.user);
		}
	]);