/*
   Si llegara a cambiar la API del GPS, este es el archivo que hay que cambiar.
   Depende del API del GPS
   De esto depende el factory de angular. 

   O sea que esto es un adaptador para el adaptador de Angular
   Toma datos puros primitivos y los convierte en elementos del Dominio.
*/

function AdaptadorGPS() {
   this.apiGPS = new geolocationApi();
}
AdaptadorGPS.prototype.getUbicacionActual = function(callback) {
   this.apiGPS.getCurrentPosition(function (posicionPura) {
      var u = new Ubicacion(
         posicionPura.coords.latitude, 
         posicionPura.coords.longitude, 
         new Date(posicionPura.timestamp)
      );
      //NO OLVIDARSE DE SACAR ESTO DESPUES.
      u.ayudita = posicionPura.ayudita;

      callback(u);
   });
};