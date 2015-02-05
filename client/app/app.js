(function() {

  'use strict';

  angular.module('magnetsApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'ngDragDrop',
    'btford.socket-io'
  ])
    .config(function ($routeProvider, $locationProvider) {
      $routeProvider
        .otherwise({
          redirectTo: '/'
        });

      $locationProvider.html5Mode(true);
    });
})();
