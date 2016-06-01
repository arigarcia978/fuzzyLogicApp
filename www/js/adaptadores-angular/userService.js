angular.module('starter')
	.factory('userService', [function(){
		var repositorioUsuarios = new RepositorioUsuarios();
		var ubicacionAnterior = new Ubicacion(41.40338, 2.17403, new Date(2016, 5, 24, 16, 25, 0, 0));
		var usuarios;
	  	return {
	    	getUltimaUbicacion: function() {
	      		return ubicacionAnterior;
	    	},
	    	actualizarUltimaUbicacion: function(nuevaUbicacion){
	    		ubicacionAnterior = nuevaUbicacion;
	    	},
	    	getUsuarios: function(){
	    		var usuarios;
	    		repositorioUsuarios.getTodosLosUsuarios(function(datos){ usuarios = datos; });
	    		return usuarios;
	    	},
	    	getUsuario: function(id){
	    		return repositorioUsuarios.getUsuarioPorId(id, function(datos){ return datos; });
	    	},
	    	getMeGustasDeUsuario: function(id){
	    		return repositorioUsuarios.getLugaresConMeGusta(id);
	    	},
	    	getVisitasALugar: function(id, lugar){
	    		return repositorioUsuarios.visitasAUnLugar(id, lugar);
	    	}
	  	}
	}]);