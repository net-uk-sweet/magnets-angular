'use strict';

describe('Directive: autofire', function () {

  // load the directive's module
  beforeEach(module('magnetsApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<autofire></autofire>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the autofire directive');
  }));
});