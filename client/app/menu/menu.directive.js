(function() {

      'use strict';

      angular.module('magnetsApp')
        .directive('swMenu', function ($compile) {
          return {
            templateUrl: 'app/menu/menu.html',
            restrict: 'EA',
            scope: {
                  addMagnet: '&',
            	colors: '=' // @ for strings, = for 2-way binding, & for function
            },
            controller: function($scope) {
            	
            	$scope.letters = _.map(_.range(
            		'a'.charCodeAt(0), 
            		'z'.charCodeAt(0) + 1), String.fromCharCode);

            	$scope.index = 0;
            	$scope.magnet = {};

                  var color, letter;

            	$scope.next = function() {
            		$scope.index = $scope.index === $scope.letters.length - 1 ? 
            			0 : $scope.index + 1;
            		createLetter();
            	};
            	
            	$scope.previous = function() {
            		$scope.index = $scope.index === 0 ? 
            			$scope.letters.length - 1 : $scope.index - 1;
            		createLetter();
            	};

            	$scope.start = function(magnet) {
            		// console.log('controller start', magnet);
            	};
            	$scope.stop = function(event, ui, magnet) {

                        // TODO: don't like coming back out of the scope of the directive to get a position
                        var offset = $('.board').offset();

                        var magnet = {
                              character: letter,
                              color: color,
                              x: ui.offset.left - offset.left,
                              y: ui.offset.top - offset.top,
                              rotation: 0,
                              selected: false
                        } 
                        $scope.addMagnet()(magnet);
            	};
            	$scope.drag = function(magnet) {
            		// console.log('controller drag', magnet);
            	};

            	function createLetter() { 
            		// console.log($scope.letters[$scope.index]);
            		letter = $scope.magnet.letter = $scope.letters[$scope.index];
            		color = $scope.magnet.color = $scope.colors[Math.round(Math.random() * ($scope.colors.length - 1))];
            	}

            	createLetter();
            },
            link: function (scope, element, attrs) {

                  // Watch for the letter property on the above controller to change
            	scope.$watch('magnet.letter', function() {

                        // And create the appropriate letter element
            		var letter = angular.element(
            			'<span>' +
            			scope.magnet.letter +
            			'</span>'
            		)
            		.addClass(scope.magnet.color + ' magnet')
            		.attr('data-drag', 'true')
            		.attr('ng-model', 'magnet')
            		.attr('jqyoui-options', "{revert: true, revertDuration: 0}")
                        .attr('jqyoui-draggable', '{ onStop: "stop(magnet)", onStart: "start(magnet)", onDrag: "drag(magnet)" }');

            		element.find('.plinth').html(letter);
            		$compile(letter)(scope);
            	});
            }
          };
      });
})();
