/* 
  TODO: 
    [ ] can I include jshint in the test config?
    [ ] is it jslint I'm running?
    [ ] check for modern way of doing drop shadow in CSS
    [x] why is none of this checked in to git?
    [ ] update selected on server
    [x] integrate my directive
    [ ] figure out how to handle the number of connections
    [ ] debug node??
*/

(function() {

  'use strict';

  angular.module('magnetsApp')
    .controller('MainController', MainController);

  function MainController($scope, $log, magnetService, socket) {

      var vm = this;

      vm.socket = {}; 
      vm.magnets = []; // our data
      vm.selected = null;

      // Controller API
      vm.setPosition = setPosition;
      vm.setSelected = setSelected;
      vm.isSelected = isSelected;
      vm.isDraggable = isDraggable;
      vm.getClass = getClass;
      vm.isDraggable = isDraggable;

      // TODO: candidates for abstraction to a controls Controller
      vm.setSelectedColor = setSelectedColor;
      vm.rotateSelected = rotateSelected;
      vm.deleteSelected = deleteSelected;

      // Grab the initial data
      magnetService.getMagnets().success(function(magnets) {

        $log.info('Got initial data');

        vm.magnets = magnets;

        // vm.magnets.forEach(function(magnet) {
        //   console.log(magnet);
        // });

        // Synchronise updates to the data
        socket.syncConnect('magnet', vm.socket);
        socket.syncConnections('magnet', vm.socket);
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

      function update(magnet) {
        magnetService.updateMagnet(magnet);
      }

      function setPosition(event, ui, magnet) {
        magnet.x = ui.position.left;
        magnet.y = ui.position.top;
        update(magnet);
      }

      function setSelected(magnet) {
        
        // Check if this client has another selected magnet
        var selected = _.findWhere(vm.magnets, { selected: vm.id });

        // If he does, unselect and update
        if (selected && selected !== magnet) {
          selected.selected = null;
          update(selected);
        }

        // Now select the new magnet and update
        if (magnet.selected !== vm.id) {
          vm.selected = magnet;
          magnet.selected = vm.id;
          update(magnet);
        }
      }

      function setSelectedColor(color) {

        var selected = vm.selected;

        if (selected) {
          selected.color = color;
          update(vm.selected);
        }
      }

      function rotateSelected() {
        
        var selected = vm.selected;

        if (selected) {
          selected.rotation = (selected.rotation + 15) % 360;
          update(vm.selected);
        }
      }

      function deleteSelected() {

        var selected = vm.selected;

        if (selected) {
          magnetService.deleteMagnet(vm.selected);
        }
      }

      // TODO: I think the fact that I'm passing the magnet in to all these
      //  functions might be an indication that I need to abstract some logic
      function isSelected(magnet) {
        return magnet.selected === vm.id;
      }

      function isDraggable(magnet) {
        return !(magnet.selected && magnet.selected !== vm.id); 
      }

      function getClass(magnet) {

        if (!magnet.selected) {
          return;
        }
        if (magnet.selected === vm.id) {
          return 'selected'; 
        }
        if (magnet.selected !== vm.id) {
          return 'inactive';
        }
      }

      // Listeners
      $scope.$on('$destroy', function () {
        // Unsubscribe from socket service on tear down
        socket.unsyncUpdates('magnet');
      });
  }

})();
