(function () {

    'use strict';

    angular.module('magnetsApp')
        .service('colorService', colorService);

    function colorService() {

        var colors = ['red', 'yellow', 'green', 'blue'];

        var getRandomColor = function() {            
            var index = Math.round(Math.random() * (colors.length - 1));
            return colors[index];
        };

        return {
            colors: colors,
            getRandomColor: getRandomColor
        };
    }

})();