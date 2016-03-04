(function () {

    // TODO: duplication in and better understanding of prehook in server/api/magnet/magnet.socket.js
    // TODO: preloader directive
    // TODO: deploy
    // TODO: get a basic unit test going
    // TODO: integrate jscs with test task

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
