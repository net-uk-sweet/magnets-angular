'use strict';

// TODO: how do I debug my tests?
// TODO: is jsHint really being run as part of this?
// TODO: how do I mock sockets? what am I achieving mocking http?

// This is the suite - it describes my test
describe('Controller: MainCtrl', function () {

  // Unit tests are NOT supposed to test interactions between the view and the rest of the universe;
  // that is what end-to-end tests are for.

  // Usual JavaScript scoping applies - anything defined here is scoped to functions below

  // Can create our own custom watchers if required.

  // load the controller's module - this tells us that the module exists and is accessible!
  beforeEach(module('magnetsApp'));
  beforeEach(module('socketMock'));

  var MainCtrl,
      scope,
      $httpBackend;

  var response = [
    {
      id: 0,
      character: "i",
      color: "#ff0000",
      x: 0,
      y: 0,
      rotation: 360,
      selected: null
    },
    {
      id: 1,
      character: "a",
      color: "#00ff00",
      x: 10,
      y: 0,
      rotation: 180,
      selected: null
    },
    {
      id: 2,
      character: "n",
      color: "#0000ff",
      x: 20,
      y: 0,
      rotation: 270,
      selected: null
    }
  ];

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('/api/magnets').respond(response);
    // Dunno if I need this one
    //$httpBackend.expectGET('/api/magnets/0').respond(response[0]);

    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  // This is a spec (or test)
  it('should have an initial magnets state', function() {
    // These are expectations (or assertions), if all of them are true the spec passes
    expect(scope.magnets).toBeDefined();
    // Expect takes an actual value and is chained to a matcher function containing the expected value
    expect(scope.magnets.length).toBe(0); // same as ===
  });

  it('should have an initial magnet state', function() {
    // It actually doesn't matter to angular whether this is defined or not.
    expect(scope.magnet).toEqual({}); // toBe == strict equality
    // To negate we can do this :-
    //expect(scope.magnet).not.toBeDefined();
  });

  it('should attach a list of things to the scope', function () {
    $httpBackend.flush();
    expect(scope.magnets.length).toBeGreaterThan(2);
  });

  // General approach to testing a $watch
  xit('should change the value of x when y changes', function() {
    scope.x = 'changed the x value'; // Change watched value
    scope.$apply(); // apply the change so the watch fires
    expect(scope.y).toBe('changed the x value'); // Check the value of other variables
  });

  describe('when calling the addMagnet function', function() {
    beforeEach(function() {
      scope.magnet = response[0];
      //spyOn($http, 'post');
      scope.addMagnet();
    });

    // it should call http service
    xit('should call $http post', function() {
      expect($http.post).toHaveBeenCalled();
    });

    it('should return if magnet is empty', function() {
      expect(scope.magnet).toEqual({});
    });

    it('should reset the value of magnet', function() {
      expect(scope.magnet).toEqual({});
    });
  });


  /*
  xdescribe('when calling the addMagnet function', function() {

    beforeEach(function() {
      //scope.apply(function() {
        scope.magnet = { character: 't', x: 10, y: 10, rotation: 100 };
        scope.addMagnet();
      //});

      it('should reset the value of magnet', function() {
        expect(scope.magnet.toBe({}));
      });
    });
  });

  xdescribe('when calling the updateMagnet function', function() {

    beforeEach(function() {
      scope.apply(function() {
        scope.magnet = { character: 't', x: 10, y: 10, rotation: 100 };
        // Not convinced this is running w/ defined magnet
        jasmine.log('..', scope.updateMagnet());
      });

      it('should reset the value of magnet', function() {
        expect(scope.magnet.toBe({}));
      });
    });
  });

  xdescribe('when calling the deleteMagnet function', function() {

  });
  */
});
