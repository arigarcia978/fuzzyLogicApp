/*
   Este adaptador en realidad lo que hace es comunicarse directo con la
   base de datos, despues los repositorios piden a este adaptador lo que
   necesiten. (Si cambio la BD, es mejor cambiar el código de una sola
   clase y no la de todos los repositorios...).

   En caso de requerir datos puros, usar:
      getDatos()

   Si se quiere que traiga objetos del dominio, están:
      getObjetos();
      getObjeto();

   También todos los repositorios deberían acceder a un solo adaptador
   y no estar cargando 20 veces la bd. (Aunque serían 20 conexiones 
   diferentes a la bd?) -> Ver después si es mejor hacerla singleton o no.
*/

function AdaptadorBaseDeDatos() {
   var adaptador = this;
   this.bd = new BaseDeDatos();
   this.CONSTANTES = {
      OBJETO: {
         USUARIO: adaptador.bd.constantes.TABLAS.USUARIOS,
         PROMOCION: adaptador.bd.constantes.TABLAS.PROMOCIONES
      }
   }
}
AdaptadorBaseDeDatos.prototype.cargar = function(nombre, datos, esto) {
   if (nombre === esto.CONSTANTES.OBJETO.USUARIO) {
      return esto.crearUsuario(datos);
   } else if (nombre === esto.CONSTANTES.OBJETO.PROMOCION) {
      return esto.crearPromocion(datos);
   }
};
AdaptadorBaseDeDatos.prototype.crearUsuario = function(datosUsuario) {
   var usuario = new Usuario(
      datosUsuario.nombre,
      datosUsuario.sexo,
      datosUsuario.fechaN
   );
   console.log(usuario);
   usuario.actualizarUbicacion(new Ubicacion(
      datosUsuario.ultimaUbicacionConocida.latitud,
      datosUsuario.ultimaUbicacionConocida.longitud,
      new Date(datosUsuario.ultimaUbicacionConocida.fecha)));
   usuario.agregarCosasQueLeGustanEnFB(datosUsuario.lugaresConMeGusta);
   usuario.setId(datosUsuario.id);
   return usuario;
}
AdaptadorBaseDeDatos.prototype.crearPromocion = function(datosPromocion) {
   //console.log(datosPromocion);
   /*
   var usuario = new Usuario(
      datosUsuario.nombre,
      datosUsuario.sexo,
      datosUsuario.fechaN
   );
   usuario.actualizarUbicacion(new Ubicacion(
      datosUsuario.ultimaUbicacionConocida.latitud,
      datosUsuario.ultimaUbicacionConocida.longitud,
      new Date(datosUsuario.ultimaUbicacionConocida.fecha)));
   usuario.agregarCosasQueLeGustanEnFB(datosUsuario.lugaresConMeGusta);
   usuario.setId(datosUsuario.id);
   return usuario;
   */
}
AdaptadorBaseDeDatos.prototype.getDatos = function(nombreObjeto, datosRequeridos, callback) {
   this.bd.getTabla(nombreObjeto, function(datosObjeto) {
      callback(datosObjeto);
   }, datosRequeridos);
}
AdaptadorBaseDeDatos.prototype.getDatosQueCumplen = function(nombreObjeto, datosRequeridos, columna, valor, callback) {
   //this.bd.
};
AdaptadorBaseDeDatos.prototype.getObjetos = function(nombreObjeto, callback) {
   var adaptador = this;
   this.getDatos(nombreObjeto, [], function(datosObjetos) {
      var objetos = [];
      datosObjetos.forEach(function(datoObjeto) {
         objetos.push(adaptador.cargar(nombreObjeto, datoObjeto, adaptador));
      });
      callback(objetos);
   })
};
AdaptadorBaseDeDatos.prototype.getObjeto = function(nombreObjeto, idObjeto, callback) {
   var adaptador = this;
   this.bd.getFila(nombreObjeto, 'id', idObjeto, function(datosObjeto) {
      callback(
         existeLaVariable(datosObjeto) ? 
            adaptador.cargar(nombreObjeto, datosObjeto, adaptador) : undefined);
   });
};