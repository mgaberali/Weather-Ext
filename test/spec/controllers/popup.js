'use strict';

describe('Controller: Popup', function () {

  // load the controller's module
  beforeEach(module('weatherExtApp'));

  var popupCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    popupCtrl = $controller('PopupController', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.cityImageUrl).toEqual("url(\'images/banner.jpg\') no-repeat");
  });
});
