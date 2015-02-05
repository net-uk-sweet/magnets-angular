(function() {

  'use strict';

  angular.module('magnetsApp')
    .service('magnetService', MagnetService);

  function MagnetService($http, $log) {

    // AngularJS will instantiate a singleton by calling "new" on this function

    var url = '/api/magnets/';

    function getMagnets() {
      return $http.get(url).error(errorHandler);
    }

    function addMagnet(magnet) {
      return $http.post(url, magnet).error(errorHandler);
    }

    function updateMagnet(magnet) {
      return $http.put(url + magnet._id, magnet).error(errorHandler);
    }

    function deleteMagnet(magnet) {
      return $http.delete(url + magnet._id).error(errorHandler);
    }

    // Catch all error handler
    function errorHandler(data, status) {
      $log.error('Failed to get %s with, error code %s', url, status);
    }

    return {
      getMagnets: getMagnets,
      addMagnet: addMagnet,
      updateMagnet: updateMagnet,
      deleteMagnet: deleteMagnet
    }
  }

})();
