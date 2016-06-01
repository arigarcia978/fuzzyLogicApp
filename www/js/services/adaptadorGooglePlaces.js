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
   this.CONSTANTES = {
      TIPO_NEGOCIO: {
         COMIDA: 'food',
         CINE: 'movie_theater',
         SUPER: 'home_goods_store',
         LIBRERIA: 'library',
         UNIVERSIDAD: 'university',
         BOLICHE: 'night_club'
      }
   }
}
/*
   Este método probablemente tome mucho tiempo en calcular. Para reducir tiempo:
      Ajustar radio de búsqueda (Reducir)
      Restringir cantidad de detalle a traer de los negocios
      Agregar forma de traer detalles por bloques:
         Primero se trae la info de los primeros 5 lugares (los más cercanos)
         Luego se van agregando los próximos 15
         Luego los próximos 30
         Luego vienen unos ~50
         Luego los últimos 100
   Extra
      Cachear el calculo de distancias 
*/
AdaptadorGooglePlaces.prototype.buscarTodosLosNegociosCercanos = function(ubicacion, tipoNegocio, callback) {
   var adaptador = this;
   if (esUnaInstancia(ubicacion, Ubicacion)) {
      //Ojo: Esta objeto depende de gplaces.
      var datos = {
         location: new google.maps.LatLng(ubicacion.getLatitud(), ubicacion.getLongitud()),
         radius: this.radioPreferido,
         types: [tipoNegocio], //TO DO: Convertir tipoNegocio a tipo
         rankBy: google.maps.RankBy.DISTANCE,
      };

      this.traerDatosDeNegociosCercanos(datos, function(resultados) {
         var lugares = [];
         resultados.forEach(function(resultado) {
            adaptador.buscarLugar(resultado.place_id, function(lugar) {
               lugares.push(lugar);
            });
         });
         callback(lugares);
      });
   } else {
      log('Ubicacion', 'buscarTodosLosNegociosCercanos', 'AdaptadorGooglePlaces');
   }
};
AdaptadorGooglePlaces.prototype.traerDatosDeNegociosCercanos = function(pedido, callback) {
   this.apiPlaces.radarSearch(pedido, function(resultados, estado) {
      if (estado == google.maps.places.PlacesServiceStatus.OK) {
         //Devuelve [{geometry: {location: {lat, lng}}, place_id},...]
         callback(resultados);
      }
   });
};
AdaptadorGooglePlaces.prototype.buscarLugar = function(placeId, callback) {
   var adaptador = this;
   var datos = {
      placeId: placeId
   };
   this.apiPlaces.getDetails(datos, function(datosLugar, estado) {
      if (estado == google.maps.places.PlacesServiceStatus.OK) {
         callback(adaptador.crearLugarParcial(datosLugar));
      }
   });
};
AdaptadorGooglePlaces.prototype.crearLugarParcial = function(datosLugar) {
   var lugar = new Lugar(
      datosLugar.name,
      new Ubicacion(
         datosLugar.geometry.location.lat, 
         datosLugar.geometry.location.lng
      )
   )
   lugar.setId(datosLugar.place_id);
   lugar.agregarTipos(datosLugar.types);
   return lugar;
};