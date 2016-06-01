angular.module('starter')
.controller('PromocionController', 
	['addsService', 
	'$scope',
	function(servicioPromocion, $scope){
		
		var lugar = servicioPromocion.getLugar();
		if (existeLaVariable(lugar, true)){
			var lugar = servicioPromocion.getLugar();
			console.log(lugar);
			var n = Math.floor(Math.random() * lugar.promociones.length);
			$scope.promocion= lugar.promociones[n];
			$scope.nombreLugar= lugar.nombre;
	}
}])