(function() {

    'use strict';

    angular.module('magnetsApp')
        .directive('swAutoFire', swAutoFire);

    function swAutoFire($timeout) {

        return {
            restrict: 'A',
            scope: {
                callback: '&callback'
            },

            link: function(scope, elem, attr) {

                // Grab attributes 
                var minSpeed = scope.$eval(attr.minSpeed) || 1,
                    maxSpeed = scope.$eval(attr.maxSpeed) || 10,
                    steps = scope.$eval(attr.steps) || 10;

                // State
                var frameDuration,
                    timeout,
                    step = 0, 
                    dspeed = maxSpeed - minSpeed;
                    
                function startTimer() {

                    timeout = $timeout(function() {
                        
                        scope.callback()();

                        step = (step === steps) ? steps : step + 1;
                    
                        frameDuration = 1000 / (maxSpeed - 
                            (Math.cos((step / steps) * 
                            (Math.PI / 2)) * dspeed));

                        startTimer();

                    }, step ? frameDuration : 0);
                }

                function stopTimer() {
                    step = 0;
                    $timeout.cancel(timeout);
                }

                function mouseDownHandler() {
                    startTimer();
                }

                function mouseUpHandler() {
                    stopTimer();
                }

                elem.on('mousedown', mouseDownHandler);
                elem.on('mouseup mouseout', mouseUpHandler);
            }
        };      
    }

})();