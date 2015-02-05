'use strict';

describe('Service: magnetService', function () {

  // load the service's module
  beforeEach(module('magnetsApp'));

  // instantiate service
  var magnetService;
  beforeEach(inject(function (_magnetService_) {
    magnetService = _magnetService_;
  }));

  it('should do something', function () {
    expect(!!magnetService).toBe(true);
  });

});
