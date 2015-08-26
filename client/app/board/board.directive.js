'use strict';

angular.module('magnetsApp')
  .directive('swBoard', function () {
    return {
      //templateUrl: 'app/board/board.html',
      restrict: 'EA',
      scope: {
        addMagnet: '='
      },
      controller: function($scope, $element) {

        var offset = $element.find('[data-board]').offset();

      	this.addMagnet = function(magnet) {
          // console.log('Magnet added', magnet, offset);
          magnet.x = magnet.x - offset.left;
          magnet.y = magnet.y - offset.top;

          $scope.addMagnet(magnet);
        };
      }
    };
  });