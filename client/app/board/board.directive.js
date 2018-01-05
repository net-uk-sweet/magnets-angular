(function () {

    'use strict';

    angular.module('magnetsApp')
        .directive('swBoard', swBoard);

    function swBoard () {

        return {
            restrict: 'EA',
            scope: {
                addMagnet: '='
            },
            controller: ['$scope', '$element', function ($scope, $element) {

                this.addMagnet = function (magnet) {

                    var offset = $element.find('[data-board]').offset();

                    // console.log('Magnet added', magnet, offset);
                    magnet.x = magnet.x - offset.left;
                    magnet.y = magnet.y - offset.top;

                    $scope.addMagnet(magnet);
                };
            }]
        };
    }
})();
