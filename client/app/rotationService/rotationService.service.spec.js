'use strict';

describe('Service: rotationService', function () {

  // load the service's module
  beforeEach(module('magnetsApp'));

  // instantiate service
  var rotationService;
  beforeEach(inject(function (_rotationService_) {
    rotationService = _rotationService_;
  }));

  it('should do something', function () {
    expect(!!rotationService).toBe(true);
  });

});
