angular.module('starter')
.controller('PromocionController', 
	['addsService', 
	'$scope',
	function(servicioPromocion, $scope){
		
		var lugar = servicioPromocion.getLugar();
		if (existeLaVariable(lugar, true)){
			var adaptadorPromociones = new AdaptadorPromociones();
			console.log(adaptadorPromociones.getPromocion(lugar))
			console.log('servicioPromocion')
			$scope.promocion = adaptadorPromociones.getPromocion(lugar)
	}
}])