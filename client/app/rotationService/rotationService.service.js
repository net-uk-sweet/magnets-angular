(function () {

    'use strict';

    angular.module('magnetsApp')
        .service('rotationService', rotationService);

    function rotationService() {

        var increment = 15,
            range = 90;

        var getRandomRotation = function() {    

            var rotation = (Math.floor(Math.random() *
                (range / increment)) * increment) -
                (range / 2);

            console.log(rotation);
            return rotation;
        };

        var getNewRotation = function(currentRotation) {
            return (currentRotation + increment) % 360;
        };

        return {
            increment: increment,
            getNewRotation: getNewRotation,
            getRandomRotation: getRandomRotation
        };
    }

})();