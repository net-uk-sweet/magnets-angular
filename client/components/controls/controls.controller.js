(function() {

	'use strict';

	angular.module('magnetsApp')
	  .controller('ControlsCtrl', ControlsController);
	  
	// TODO: do I need this controller?? It's not really doing anything
	function ControlsController($scope) {

		var vm = this;

	    vm.colors = ['red', 'yellow', 'green', 'blue'];
	  }
})();

