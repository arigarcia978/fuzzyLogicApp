angular.module('App', ['ionic'])

.controller('HomeController', function($scope, $ionicModal) {
  $scope.ubicacion = {
    latitud : 0,
    longitud : 0,
    geolocalizado : false
  };
  $scope.Geolocalizar = function () { $ionicModal.fromTemplateUrl('modalMapa.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.modal = modal;
      $scope.modal.show();
    });
  };
})
.directive('map', function ($ionicLoading) {
    return {
        restrict: 'E',
      	scope: {
          latitud : "=",
          longitud : "=",
          geolocalizado : "="
        },
      	bindToController: true,
        template: "<div></div>",
        controller: function ($scope, $element) {
          debugger;
          function CreateMap(centro, successFunction) {
                var map = new google.maps.Map($element[0], {
                    center: centro,
                    zoom: 17,
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    panControl: false,
                    streetViewControl: false,
                    zoomControlOptions: {
                        position: google.maps.ControlPosition.LEFT_CENTER
                    }
                });
                var styledMapType = new google.maps.StyledMapType([
                {
                    featureType: 'all',
                    elementType: 'all',
                    stylers: [
                    { saturation: -99 }
                  ]
                }], {
                    map: map,
                    name: 'Night Map'
                });
                map.mapTypes.set('map-style', styledMapType);
                map.setMapTypeId('map-style');
                google.maps.event.addDomListener($element[0], 'mousedown', function (e) {
                    e.preventDefault();
                    return false;
                });
                google.maps.event.addListener(map, 'click', function (e) {
                    CreateMarker(e.latLng);
                });
                google.maps.event.addListener(map, "idle", function () {
                    google.maps.event.trigger(map, 'resize');
                });
                var marker = new google.maps.Marker();
                function CreateMarker(latLng) {
                    	$scope.latitud = latLng.lat(); //latitud
                      $scope.longitud = latLng.lng(); //longitud
                    console.log($scope.latitud);
                    console.log($scope.longitud);
                    marker.setMap(null);
                    marker = new google.maps.Marker({
                        position: latLng,
                        animation: google.maps.Animation.DROP,
                        map: map
                    });
                    map.setZoom(17);
                    setTimeout(function () {
                        map.setZoom(18);
                        map.setCenter(latLng);
                    }, 500);
                }
                if (successFunction) {
                    successFunction(CreateMarker);
                }
            }
            if (!$scope.geolocalizado) {//No se ha obtenido la ubicación
                $ionicLoading.show({
                    template: 'Cargando...'
                });
                navigator.geolocation.getCurrentPosition(function (pos) {
                    var LatLng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
                    CreateMap(LatLng, function (CreateMarker) {
                        CreateMarker(LatLng);
                        $ionicLoading.hide();
                        $scope.geolocalizado = true;
                    });
                }, function () {
                    //Ubicación por defecto
                    var LatLng = new google.maps.LatLng(6.233311, -75.575248);
                    CreateMap(LatLng, function () {
                        $ionicLoading.hide();
                        $scope.geolocalizado = true;
                    });
                },{maximumAge: 3000, timeout: 5000, enableHighAccuracy: true});
            } else {
                var LatLng = new google.maps.LatLng($scope.latitud,
                                                 $scope.longitud);
                CreateMap(LatLng, function (CreateMarker) {
                    CreateMarker(LatLng);
                });
            }
        }
    }
});;