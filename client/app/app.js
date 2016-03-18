(function () {

    // TODO: duplication in and better understanding of prehook in server/api/magnet/magnet.socket.js
    // TODO: get a basic unit test going
    // TODO: integrate jscs with test task
    // TODO: main controller is doing too much - review code for candidates for abstraction
    // TODO: not making enough use of templates in directives

    // TODO: transitions on load
    // TODO: deploy
    
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
