/*
   Si llegara a cambiar la API de Places, este es el archivo que hay que cambiar.
   Depende del API de Google Places
   De esto depende el factory de angular. 

   O sea que esto es un adaptador para el adaptador de Angular
   Toma datos puros primitivos y los convierte en elementos del Dominio.

   Esta implementación está hecha para que no sufra demasiados cambios al usar
   la api verdadera.
*/

function AdaptadorGooglePlaces() {
   this.mapaTeorico = new google.maps.Map(document.createElement('div'));
   this.apiPlaces = new google.maps.places.PlacesService(this.mapaTeorico);
   this.radioPreferido = 350;
   this.tipos = {
      COMIDA: 'food',
      CINE: 'movie_theater',
      SUPER: 'home_goods_store',
      UNIVERSIDAD: 'university'
   }
}
AdaptadorGooglePlaces.prototype.buscarTodosLosNegociosCercanos = function(ubicacion, tipoNegocio, callback) {
   var adaptador = this;
   if (ubicacion instanceof Ubicacion) {
      var datos = {
         location: new google.maps.LatLng(ubicacion.getLatitud(), ubicacion.getLongitud()),
         radius: this.radioPreferido,
         types: ['food'], //TO DO: Convertir tipoNegocio a tipo
         rankBy: google.maps.RankBy.DISTANCE,
      };

      this.apiPlaces.radarSearch(datos, function(resultados, estado) {
         if (estado == google.maps.places.PlacesServiceStatus.OK) {
            var lugares = [];
            for (var i = 0, l = resultados.length; i < l; i++) {
               adaptador.buscarNegocio(resultados[i].place_id, function(lugar) {
                  lugares.push(lugar);
               });
            }
            callback(lugares);
         }
      });
   }
};
AdaptadorGooglePlaces.prototype.buscarNegocio = function(placeId, callback) {
   var datos = {
      placeId: placeId
   };
   this.apiPlaces.getDetails(datos, function(lugar, estado) {
      if (estado == google.maps.places.PlacesServiceStatus.OK) {
         callback(lugar);
      }
   });
};