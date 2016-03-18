(function () {

    'use strict';

    angular.module('magnetsApp')
        .directive('swMenu', swMenu);

    function swMenu ($compile, colorService, rotationService) {
        return {
            templateUrl: 'app/menu/menu.html',
            restrict: 'EA',
            require: '^swBoard',
            scope: {
                addMagnet: '&',
                colors: '=' // @ for strings, = for 2-way binding, & for function
            },
            controller: function ($scope) {

                // If you don't understand it when you come back to it, it's probably
                // to trickster. Plus this method appears to generate unnecessary
                // characters which need to be removed in the createLetter method
                // below. Perhaps a candidate for a refactor!
                $scope.letters = _.map(_.range(
                    'a'.charCodeAt(0),
                    'z'.charCodeAt(0) + 1), String.fromCharCode);

                $scope.index = 0;
                $scope.magnet = {};

                var color, letter;

                $scope.next = function () {
                    $scope.index = $scope.index === $scope.letters.length - 1 ?
                        0 : $scope.index + 1;
                    createLetter();
                };

                $scope.previous = function () {
                    $scope.index = $scope.index === 0 ?
                    $scope.letters.length - 1 : $scope.index - 1;
                    createLetter();
                };

                $scope.stop = function (event, ui) {

                    $scope.boardController.addMagnet({
                        character: letter,
                        color: color,
                        x: ui.offset.left,
                        y: ui.offset.top,
                        rotation: rotationService.getRandomRotation(),
                        selected: false
                    });
                    createLetter();
                };

                function createLetter () {
                    letter = $scope.magnet.letter = $scope.letters[$scope.index].substr(0, 1);
                    color = $scope.magnet.color = colorService.getRandomColor();
                }

                createLetter();
            },
            link: function (scope, element, attrs, controller) {

                scope.boardController = controller;

                // Watch for the letter property on the above controller to change
                scope.$watch('magnet', function () {

                    // And create the appropriate letter element
                    var letter = angular.element(
                        '<span>' +
                        scope.magnet.letter +
                        '</span>'
                    )
                    .addClass(scope.magnet.color + ' magnet')
                    .addClass('magnet-' + scope.magnet.letter)
                    .attr('data-drag', 'true')
                    .attr('ng-model', 'magnet')
                    .attr('jqyoui-options', '{revert: true, revertDuration: 0}')
                    .attr('jqyoui-draggable', '{ onStop: "stop(magnet)" }');

                    element.find('.plinth')
                    .empty()
                    .html(letter);

                    $compile(letter)(scope);
                }, true);
            }
        };
    }
})();
