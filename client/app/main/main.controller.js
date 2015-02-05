// TODO: can I include jshint in the test config?
// TODO: get this up on github
// TODO: check for modern way of doing drop shadow in CSS

(function() {

  'use strict';

  angular.module('magnetsApp')
    .controller('MainController', MainController);

  function MainController($scope, $log, magnetService, socket) {

      var vm = this;

      vm.id = ''; // socket id assigned to this clien

      vm.magnets = [];
      vm.magnet = {};

      // Controller API
      vm.addMagnet = addMagnet;
      vm.updateMagnet = updateMagnet;
      vm.deleteMagnet = deleteMagnet;
      vm.selectMagnet = selectMagnet;
      vm.isSelected = isSelected;
      vm.mouseDownHandler = mouseDownHandler;
      vm.dragStartHandler = dragStartHandler;
      vm.dragStopHandler = dragStopHandler;
      vm.dragHandler = dragHandler;

      // Grab the initial data
      magnetService.getMagnets().success(function(magnets) {

        $log.info('Got initial data');

        vm.magnets = magnets;

        // Synchronise updates to the data
        socket.syncConnect('magnet', socketConnectHandler);
        socket.syncUpdates('magnet', vm.magnets);
      });

      // Could handle connection here by binding directly to the socket
      // property of the service, but I think I prefer the handling
      // to be encapsulated within the service.
      /*
      socket.socket.on('magnet:connect', function(message){
        console.log('hello', message);
      });
      */

      function addMagnet() {
        magnetService.addMagnet(vm.magnet);
      }

      function updateMagnet() {
        magnetService.updateMagnet(vm.magnet);
      }

      function deleteMagnet(magnet) {
        magnetService.deleteMagnet(magnet);
      }

      function selectMagnet(magnet) {

        //if (vm.magnet.id) {
        //  vm.magnet.selected = '';
        //  updateMagnet();
        //}

        vm.magnet = magnet;
        vm.magnet.selected = vm.id;
        //updateMagnet();
      }

      function isSelected(magnet) {
        return magnet._id === vm.magnet._id;
      }

      // Listeners
      $scope.$on('$destroy', function () {
        // Unsubscribe from socket service on tear down
        socket.unsyncUpdates('magnet');
      });

      // Handlers

      function socketConnectHandler(id) {
        vm.id = id;
      }

      function mouseDownHandler(magnet) {
        vm.selectMagnet(magnet);
      }

      function dragStartHandler(event, ui, magnet) {
        // Strange that we have to apply here, would have expected
        // the drag and drop service to ensure event was fired
        // within the angular context??
        $scope.$apply(function () {
          vm.selectMagnet(magnet);
        });
      }

      function dragStopHandler(event, ui) {

        vm.magnet.x = ui.position.left;
        vm.magnet.y = ui.position.top;

        $scope.$apply(function() {
          vm.updateMagnet();
        });
      }

      function dragHandler(event, ui) {
        //console.log('MainCtrl: dragging');
      }
  }

})();
