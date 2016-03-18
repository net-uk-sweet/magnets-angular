(function () {

    'use strict';

    angular.module('magnetsApp')
        .directive('swPreloader', swPreloader);

    function swPreloader(colorService, rotationService) {

        return {
            restrict: 'A',
            scope: {
                magnetsLoaded: '=magnetsLoaded',
                preloaderComplete: '=preloaderComplete'
            },
            controller: function($scope, $element, $interval) {

                var message ='loading',
                    index = 0;

                var interval = $interval(intervalHandler, 1000);
                
                function intervalHandler() {
                    
                    var letter = message.substr(index, 1);
                    
                    createLetter(letter);

                    index = index === message.length ? 0 : index + 1;

                    if (index === 0) {

                        $element.html('');

                        if ($scope.magnetsLoaded && index === 0) {
                            $interval.cancel(interval);
                            $scope.preloaderComplete = true;
                        }
                    }
                }

                function createLetter(letter) {

                    $('<li>' + letter + '</li>')
                        .appendTo($element)
                        .addClass('magnet')
                        .addClass('magnet--preloader')
                        .attr('style', 'transform: rotate(' + rotationService.getRandomRotation() + 'deg)')
                        .addClass(colorService.getRandomColor());
                }
            }
        };
    }

})();