function RepositorioLugares() {
   this.bd = new AdaptadorBaseDeDatos();
   this.bdLugares = new AdaptadorGooglePlaces();
   this.nombreObjetoPreferido = this.bd.CONSTANTES.OBJETO.PROMOCION;
   this.CONSTANTES = {
   }
}
//Hummmmmmmmmmm.....
RepositorioLugares.prototype.getTodasLasPromociones = function(callback) {
   this.bd.getDatos(this.nombreObjetoPreferido, [], function(datosPromociones) {
      callback(datosPromociones);
   });
};
RepositorioLugares.prototype.getTodosLosLugaresCercanos = function(ubicacion, tipoNegocio, callback) {
   if (esUnaInstancia(ubicacion, Ubicacion)) {
      var lugares;
      var datosPromociones;
      var datosCompletos = 0;
      this.bdLugares.buscarTodosLosNegociosCercanos(ubicacion, tipoNegocio, function(lugaresCercanos) {
         lugares = lugaresCercanos;
         datosCompletos++;
         completarLugares();
      });
      this.getTodasLasPromociones(function(dPromociones) {
         datosPromociones = dPromociones;
         datosCompletos++;
         completarLugares();
         
      });

      function completarLugares() {
         if (datosCompletos === 2) {
            lugares.forEach(function(lugar) {
               datosPromociones.forEach(function(datoPromo) {
                  if (lugar.place_id === datoPromo.lugar.place_id) {
                     var promociones = [];
                     datoPromo.ofertas.forEach(function(oferta) {
                        promociones.push(new Promocion(
                           oferta.titulo, oferta.descripcion));
                     });
                     lugar.agregarPromociones(promociones);
                  }
               })
            });
            callback(lugares);
         }
      }
      
   } else {
      log.seEsperabaUn('Ubicacion', 'getTodosLosLugaresCercanos', 'RepositorioLugares');
   }
};
RepositorioLugares.prototype.getLugarPorId = function(place_id, callback) {
   this.bdLugares.buscarLugar(place_id, function(lugar) {
      callback(lugar);
   });
}
RepositorioLugares.prototype.guardarLugar = function(promocion) {
   //TODO.... Recordar comprobar es un objeto Usuario primero.
};