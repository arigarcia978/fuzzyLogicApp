angular.module('starter')
	.factory('userService', [function(){
		var ubicacionAnterior = new Ubicacion(41.40338, 2.17403, 41.40338, 2.17403, new Date(2016, 5, 24, 16, 25, 0, 0));
	  	return {
	    	getUltimaUbicacion: function() {
	    		console.log(ubicacionAnterior);
	      		return getLugaresCercanos(ubicacion);
	    	}
	  	}
	}]);