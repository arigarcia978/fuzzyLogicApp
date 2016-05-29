angular.module('starter')
	.controller('ProfilesController', ['userService', '$scope', function(userService, $scope){
		$scope.users = userService.getUsuarios();
	}]);