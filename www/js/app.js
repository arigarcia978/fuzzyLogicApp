  // Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider){
  $stateProvider.state('inicio',{
    url:'/inicio',
    templateUrl: 'templates/inicio.html'
  });
    $stateProvider.state('login',{
    url:'/login',
    controller: "ProfilesController",
    templateUrl: 'templates/login.html'
  });
      $stateProvider.state('perfil',{
    url:'/perfil/:id',
    controller: "LocationController",
    templateUrl: 'templates/perfil.html'
  });
      $stateProvider.state('recomendado',{
    url:'/recomendado',
    controller: "PromocionController",
    templateUrl: 'templates/recomendado.html'
  });

  $urlRouterProvider.otherwise('/inicio')
});

