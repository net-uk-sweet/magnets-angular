'use strict';

angular.module('magnetsApp')
  .controller('NavbarCtrl', function ($scope, $location) {
    $scope.menu = [
      { 'title': 'Home', 'link': '/' },
      { 'title': 'Admin', 'link': '/admin' }
    ];

    $scope.isCollapsed = true;

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
