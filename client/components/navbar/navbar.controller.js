(function () {

    'use strict';

    angular.module('magnetsApp')
        .controller('NavbarCtrl', NavbarCtrl);

    function NavbarCtrl ($scope, $location) {
        $scope.menu = [
            { 'title': 'Home', 'link': '/' },
            { 'title': 'Admin', 'link': '/admin' }
        ];

        $scope.isCollapsed = true;

        $scope.isActive = function (route) {
            return route === $location.path();
        };
    }
})();

