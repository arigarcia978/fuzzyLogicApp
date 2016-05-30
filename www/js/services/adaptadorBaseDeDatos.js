function AdaptadorBaseDeDatos() {
   this.bd = new BaseDeDatos();
}
AdaptadorBaseDeDatos.prototype.getTodosLosUsuarios = function(callback) {
   this.bd.getTabla(this.bd.constantes.TABLAS.USUARIOS, function(datosUsuarios) {
      var usuarios = datosUsuarios.forEach(function(datosUsuario) {
         return new Usuario(
            datosUsuario.nombre,
            datosUsuario.sexo,
            datosUsuario.fechaN
         );
     });



      callback(usuarios);
   });
};
AdaptadorBaseDeDatos.prototype.getUsuarioPorId = function(id) {
   var usuarioEncontrado = this.usuarios.filter(function (usuario) {
      return usuario.id == id;
   });
   return arrayConUnicoElemento(usuarioEncontrado) ? arrayGetUltimoElemento(usuarioEncontrado) : {};
}