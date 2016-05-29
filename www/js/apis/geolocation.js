/*
   "Referenciarlo luego desde: adaptador-gps"

   Me basé en:
      https://github.com/apache/cordova-plugin-geolocation

   Un plugin de cordova permite manejar el gps del celular.
   Tiene los métodos:
      
   #  getCurrentPosition(callbackExito, callbackError, configuraciones)
      Ejemplo:

      getCurrentPosition(function (position) {
         position.coords.latitude
         position.coords.longitude
         position.coords.accuracy         //Nivel de precisión en metros
         position.coords.heading          //Dirección... Especie de compass pete??
         position.coords.speed            //[m/s] Hay que ver esto si lo obviamos o no
         position.timestamp               //Esto es exactamente -> new Date().getTime()
      })

      configuraciones es un objeto:
      {
         maximumAge: 3000,                //[ms] Acepta ubicacion de cache si no pasó este tiempo
         timeout: 5000,                   //[ms] Limita espera hasta recibir ubicación
         enableHighAccuracy: true         //Pide del GPS en vez de calcular por red
      }

      Nota: Cuando se pone el timeout, hay giladas en Android que joden.
      
   #  watchPosition()      //Activa evento recibir posicion cada vez que se mueve el cel
   #  clearWatch(id)       //Desactiva... id es el devuelto por watchPosition()

   Algo importante, el plugin es global, yo lo encerré en un objeto para simular.
   Además, requiere permiso del usuario, el plugin sabe de esta forma si anda

   document.addEventListener("deviceready", onDeviceReady, false);
   function onDeviceReady() {
      //Cuando se entra a esta función, recién se activan todos los métodos.
      console.log("navigator.geolocation works well");
   }

*/

function geolocationApi() {

   //Coordenadas guardadas para simular que la api del gps nos devuelve ubicacion
   this.coordenadas = [
      {lat: -26.826708, lon: -65.203769, ayudita: '25 de mayo casi llegando a la Córdoba'},
      {lat: -26.824831, lon: -65.203330, ayudita: '25 de mayo entre Santiago y San Juan'},
      {lat: -26.822596, lon: -65.204047, ayudita: 'Esquina Corrientes y Muñecas'},
      {lat: -26.823787, lon: -65.218252, ayudita: 'Don Bosco entre 12 de octubre y Mitre'},
      {lat: -26.822050, lon: -65.199478, ayudita: 'Esquina Marcos Paz y Rivadavia'},
   ];

}
geolocationApi.prototype.getCurrentPosition = function(callbackExito) {
   
   var c = this.coordenadas[Math.floor(Math.random() * this.coordenadas.length)];

   var position = {}
   position.timestamp = new Date().getTime();
   position.ayudita = c.ayudita;
   position.coords = {
      latitude: c.lat,
      longitude: c.lon
   }

   callbackExito(position);
};