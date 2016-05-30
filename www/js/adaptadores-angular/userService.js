angular.module('starter')
	.factory('userService', [function(){
		var repositorioUsuarios = new BaseDeDatosDeUsuarios();
		var ubicacionAnterior = new Ubicacion(41.40338, 2.17403, new Date(2016, 5, 24, 16, 25, 0, 0));
	  	return {
	    	getUltimaUbicacion: function() {
	      		return ubicacionAnterior;
	    	},
	    	actualizarUltimaUbicacion: function(nuevaUbicacion){
	    		ubicacionAnterior = nuevaUbicacion;
	    	},
	    	getUsuarios: function(){
	    		return repositorioUsuarios.getTodosLosUsuarios();
	    	},
	    	getUsuario: function(id){
	    		return repositorioUsuarios.getUsuarioPorId(id);
	    	},
	    	getMeGustasDeUsuario: function(id){
	    		return repositorioUsuarios.getLugaresConMeGusta(id);
	    	},
	    	getVisitasALugar: function(id, lugar){
	    		return repositorioUsuarios.visitasAUnLugar(id, lugar);
	    	}
	  	}
	}]);