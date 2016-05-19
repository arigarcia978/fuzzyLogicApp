angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

.controller('LocationController', ['googleMaps', function(googleMaps){
  function actualizarUbicacion(nuevaUbicacion){
    var lugaresCercanos;

    var seMovió = compararUbicaciones(nuevaUbicacion);
    comprobarSiEsVisita();

    if(seMovió) {
      lugaresCercanos = googleMaps.buscarLugaresCercanos(nuevaUbicacion);
      getPromocionesAOfrecer(nuevaUbicacion, lugaresCercanos);
      actualizarUltimaUbicacion();
    }
  }

  function compararUbicaciones(nuevaUbicacion){

  }
}]);

function Ubicacion(latitud, longitud) {
  this.latitud = latitud;
  this.longitud = longitud;
}

Ubicacion.prototype.getLatitud = function(){
  return this.latitud;
}