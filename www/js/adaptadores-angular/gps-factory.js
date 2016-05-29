angular.module(CONSTANTES.NOMBRE_MODULO)
   .factory(CONSTANTES.NOMBRE_FACTORY_GPS, function() {

      var gps = new AdaptadorGPS();

      return {
         getUbicacionActual: function(callback) {
            gps.getUbicacionActual(function (ubicacion) {
               callback(ubicacion);
            });
         }
      }

   });