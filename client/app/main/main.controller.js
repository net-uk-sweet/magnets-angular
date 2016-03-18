(function () {

    'use strict';

    angular.module('magnetsApp')
        .controller('MainController', MainController);

    function MainController ($scope, $log, magnetService, colorService, rotationService, socket) {

        var vm = this;

        vm.socket = {}; // info about the socket connection
        vm.magnets = []; // our data
        vm.colors = colorService.colors;

        // Controller API
        vm.isLoaded = isLoaded;
        vm.setPosition = setPosition;
        vm.setSelected = setSelected;
        vm.getSelected = getSelected;
        vm.isSelected = isSelected;
        vm.isDraggable = isDraggable;
        vm.getClass = getClass;
        vm.isDraggable = isDraggable;

        // TODO: candidates for abstraction to a controls Controller
        vm.setSelectedColor = setSelectedColor;
        vm.rotateSelected = rotateSelected;
        vm.deleteSelected = deleteSelected;
        vm.addMagnet = addMagnet;

        // Grab the initial data
        magnetService.getMagnets().success(function (magnets) {

            $log.info('Got initial data');

            vm.magnets = magnets;

            // Synchronise updates from socket
            socket.syncSocket(vm.socket);
            socket.syncUpdates('magnet', vm.magnets);
        });

        function isLoaded () {
            return vm.magnets.length && vm.preloaderComplete;
        }

        function update (magnet) {
            magnetService.updateMagnet(magnet);
        }

        function setPosition (event, ui, magnet) {
            magnet.x = ui.position.left;
            magnet.y = ui.position.top;
            update(magnet);
        }

        function setSelected (magnet) {
            if (!magnet.selected) {
                magnet.newSelected = true;
                magnet.selected = vm.socket.id;
                update(magnet);
            }
        }

        function getSelected () {
            return _.findWhere(vm.magnets, { selected: vm.socket.id });
        }

        function setSelectedColor (color) {

            var selected = getSelected();

            if (selected) {
                selected.color = color;
                update(selected);
            }
        }

        function rotateSelected () {

            var selected = getSelected(),
                newRotation;

            if (selected) {
                newRotation = rotationService.getNewRotation(selected.rotation);
                selected.rotation = newRotation;
                update(selected);
            }
        }

        function deleteSelected () {

            var selected = getSelected();

            if (selected) {
                magnetService.deleteMagnet(selected);
            }
        }

        function addMagnet (magnet) {
            magnet.newSelected = true;
            magnet.selected = vm.socket.id;
            magnetService.addMagnet(magnet);
        }

        // TODO: I think the fact that I'm passing the magnet in to all these
        //  functions might be an indication that I need to abstract some logic
        function isSelected (magnet) {
            return magnet.selected === vm.socket.id;
        }

        function isDraggable (magnet) {
            return !(magnet.selected && magnet.selected !== vm.socket.id);
        }

        function getClass (magnet) {

            if (!magnet.selected) {
                return;
            }
            if (magnet.selected === vm.socket.id) {
                return 'selected';
            }
            if (magnet.selected !== vm.socket.id) {
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
