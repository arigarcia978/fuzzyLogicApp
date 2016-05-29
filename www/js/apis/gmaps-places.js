/*
   "Simulación"

   El places de Google sirve para traer lugares en base
   a una ubicación.
   Si se busca por "prominence", se puede dar un area en vez de una
   ubicación, y se especifica sí o sí un radio. Luego Google devuelve
   los lugares en el orden que cree le interesará al usuario. 
            (Es el usado por defecto. No usaríamos este, creería).
   Si se busca por "distance", no se puede especificar ni area ni radio,
   sino que se tiene que especificar una palabra clave, un nombre, o 
   el un tipo. (Probablemente busquemos solo por tipo)

   En este caso hablo de búsqueda "Nearby". Existe un busqueda "Radar"
   que devuelve solo la ubicación e id de los lugares, pero puede traer
   hasta 200 lugares cercanos.

   Solo se puede especificar 1 tipo y pueden ser (para la búsqueda):

   ["accounting", "airport", "amusement_park", "aquarium", "art_gallery", "atm", "bakery", "bank", "bar", "beauty_salon", "bicycle_store", "book_store", "bowling_alley", "bus_station", "cafe", "campground", "car_dealer", "car_rental", "car_repair", "car_wash", "casino", "cemetery", "church", "city_hall", "clothing_store", "convenience_store", "courthouse", "dentist", "department_store", "doctor", "electrician", "electronics_store", "embassy", "establishment", "finance", "fire_station", "florist", "food", "funeral_home", "furniture_store", "gas_station", "general_contractor", "grocery_or_supermarket", "gym", "hair_care", "hardware_store", "health", "hindu_temple", "home_goods_store", "hospital", "insurance_agency", "jewelry_store", "laundry", "lawyer", "library", "liquor_store", "local_government_office", "locksmith", "lodging", "meal_delivery", "meal_takeaway", "mosque", "movie_rental", "movie_theater", "moving_company", "museum", "night_club", "painter", "park", "parking", "pet_store", "pharmacy", "physiotherapist", "place_of_worship", "plumber", "police", "post_office", "real_estate_agency", "restaurant", "roofing_contractor", "rv_park", "school", "shoe_store", "shopping_mall", "spa", "stadium", "storage", "store", "subway_station", "synagogue", "taxi_stand", "train_station", "travel_agency", "university", "veterinary_care", "zoo"]
   No pude comprobar qué devuelve por ejemplo Burguer desde el gmaps, 
   perdí 2 horas en esto e.e Lo que sí, si buscas por ejemplo "food"
   te marca todo, sin importar sea restaurante, bar, comida rápida, etc.
   
   Algunos que nos importan por ahora; food, movie_theater, home_goods_store, night_club, university

   Nota: Las apis que ofrece Google de Places son 3:
      Places js api; places android api; places webservice api.
   El tercero lo vi bastante, pero en teoría es para usar del lado servidor.
   Recomiendan los otros 2 para lado cliente. Y en las implementaciones
   de cómo usarlo, siempre veo que crean un mapa para hacer una llamada
   y nosotros no queremos mapa... Ver cual usar de los 3


   Un ejemplo del webservice: 

   Request {
      location: -33.8670,151.1957
      radius: 500
      types: food
      name: cruise
      key: API_KEY
   }

   Response = {
      results: [{
         geometry: {
            location: {
               lat: -33.86879,
               lng: 11.194217
            }
         },
         icon: "http://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
         id: "21a0b251c9b8392186142c798263e289fe45b4aa",
         name: "Rhythmboat Cruises",
         opening_hours: {
            open_now: false,
            weekday_text: []
         },
         photos: [{}],
         place_id: "ChIJyWEHuEmuEmsRm9hTkapTCrk",
         reference: "CnRmAAAAvQl ...reference truncated in this example",
         scope: "GOOGLE",
         types: [ "restaurant", "food", "point_of_interest", "establishment" ],
         vicinity: "Pyrmont Bay Wharf (Near Australia Maritime Museum), Pyrmont, NSW 2009"
      },{
         geometry: {
            location: {
               lat: -33.867591,
               lng: 151.201196
            }
         },
         icon: "http://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
         id: "a97f9fb468bcd26b68a23072a55af82d4b325e0d",
         name: "Australian Cruise Group",
         opening_hours: {
            open_now: false,
            weekday_text: []
         },
         photos: [{}],
         place_id: "ChIJrTLr-GyuEmsRBfy61i59si0",
         reference: "CnRqAAAAFbuk ...reference truncated in this example",
         scope: "GOOGLE",
         types: ["restaurant","travel_agency","food","point_of_interest","establishment"],
         vicinity: "32 The Promenade, King Street Wharf 5, Sydney"
      }],
      status : "OK"
   }
   

   En cuanto a los términos y condiciones del servicio, 
   https://developers.google.com/places/web-service/policies
   tenemos que agregar un logo de google en algún lado donde mostremos
   la info del Places, sin importar que no usemos ningún mapa.
*/

var google = {
   maps: {
      LatLng: function(lat, lon) {
         this.latitude = lat;
         this.longitude = lon;
      },
      Map: function(nodo) {
         this.nodo = nodo;
      },
      RankBy: {
         DISTANCE: 'd',
         PROMINENCE: 'p'
      },
      places: {
         PlacesService: function(mapa) {
            this.mapa = mapa;
         },
         PlacesServiceStatus: {
            OK: 100
         }
      }
   }
}

google.maps.places.bdImprovisada = [
   {place_id: '389274', nombre: 'Mc Donald', tipoPagina:'Restaurante de Comida Rápida', tipo: 'food', lat: -26.825653, lng: -65.203591},
   {place_id: '623526', nombre: 'La Pizzada', tipoPagina:'Pizzería' , tipo: 'food', lat: -26.830821, lng: -65.204742},
   {place_id: '734634', nombre: 'Burguer King', tipoPagina:'Comida Rápida' , tipo: 'food', lat: -26.824049, lng: -65.202997},
   {place_id: '347346', nombre: 'Recorcholis', tipoPagina:'Discoteca' , tipo: 'night_club', lat: -26.813362, lng: -65.291265},
   {place_id: '345786', nombre: 'El Balón', tipoPagina:'Bar restaurante' , tipo: 'food', lat: -26.821314, lng: -65.199179},
   {place_id: '287456', nombre: 'Mil99', tipoPagina:'Bar restaurante' , tipo: 'food', lat: -26.816691, lng: -65.197985},
   {place_id: '287964', nombre: 'Vea', tipPagina:'Supermercado' , tipo: 'home_goods_store', lat: -26.818280, lng: -65.205516},
   {place_id: '419783', nombre: 'Lancaster', tipoPagina:'Club nocturno' , tipo: 'night_club', lat: -26.730901, lng: -65.262831},
   {place_id: '567895', nombre: 'Carrefour', tipoPagina:'Supermercado' , tipo: 'home_goods_store', lat: -26.814933, lng: -65.209499},
   {place_id: '867456', nombre: 'Atlas', tipoPagina:'Cine' , tipo: 'movie_theater', lat: -26.828476, lng: -65.199654}
];
google.maps.places.PlacesService.prototype.nearbySearch = function(request, callback) {
   callback('datos de google en forma de Array', google.maps.places.PlacesServiceStatus.OK);
}
google.maps.places.PlacesService.prototype.radarSearch = function(request, callback) {
   callback(google.maps.places.bdImprovisada.filter(function(lugar) {
      return request.types[0] === lugar.tipo;
   }).map(function(lugar) {
      return {
         place_id: lugar.place_id,
         geometry: {
            location: {
               lat: lugar.lat,
               lng: lugar.lng
            }
         }
      }
   }).sort(function(a,b) {
      var ubicacionActual = new Ubicacion(request.location.latitude, request.location.longitude);
      var distanciaA = motorMatematico.calcularDistanciaEnKMEntreUbicaciones(
         ubicacionActual,
         new Ubicacion(a.geometry.location.lat, a.geometry.location.lng)
      );
      var distanciaB = motorMatematico.calcularDistanciaEnKMEntreUbicaciones(
         ubicacionActual,
         new Ubicacion(b.geometry.location.lat, b.geometry.location.lng)
      );
      return distanciaA - distanciaB;
   }), google.maps.places.PlacesServiceStatus.OK);
}
google.maps.places.PlacesService.prototype.getDetails = function(request, callback) {
   callback(google.maps.places.bdImprovisada.filter(function(lugar) {
      return (lugar.place_id == request.placeId);
   }).map(function(lugar) {
      return {
         name: lugar.nombre,
         place_id: lugar.place_id,
         geometry: {
            location: {
               lat: lugar.lat,
               lng: lugar.lng
            }
         },
         types: [lugar.tipo, lugar.tipoPagina]
      }
   }).pop(), google.maps.places.PlacesServiceStatus.OK);
}