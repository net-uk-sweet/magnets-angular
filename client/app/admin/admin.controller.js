(function () {

    'use strict';

    angular.module('magnetsApp')
        .controller('AdminController', AdminController);

    function AdminController ($scope) {
        $scope.message = 'Hello';
    }

})();
