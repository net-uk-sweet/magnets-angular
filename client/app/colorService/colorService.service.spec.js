'use strict';

describe('Service: colorService', function () {

  // load the service's module
  beforeEach(module('magnetsApp'));

  // instantiate service
  var colorService;
  beforeEach(inject(function (_colorService_) {
    colorService = _colorService_;
  }));

  it('should do something', function () {
    expect(!!colorService).toBe(true);
  });

});
