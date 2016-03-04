(function() {

  'use strict';

    angular.module('magnetsApp')
        .config(function ($routeProvider) {
            $routeProvider
            .when('/', {
                templateUrl: 'app/main/main.html',
                controller: 'MainController as main'
            });
    });
})();
