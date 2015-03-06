'use strict';

describe('Controller: ControlsCtrl', function () {

  // load the controller's module
  beforeEach(module('magnetsApp'));

  var ControlsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ControlsCtrl = $controller('ControlsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
