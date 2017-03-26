describe('GeoIpService', function () {
  // Load your module.
  beforeEach(module('weatherExtApp'));

  // Setup the mock service in an anonymous module.
  beforeEach(module(function ($provide) {
    $provide.value('oneOfMyOtherServicesStub', {

    });
  }));

  it('return correct data when requesting geo ip api is success', inject(function(GeoIpService, $httpBackend) {

    $httpBackend
      .when('GET', 'http://geoip.nekudo.com/api')
      .respond(200, { location: 'cairo' });

    GeoIpService.getLocation(function(response){
      expect(response).toEqual({ location: 'cairo' });
    });

    $httpBackend.flush();

  }));

  it('return error when requesting geo ip api is failed', inject(function(GeoIpService, $httpBackend) {

    $httpBackend
      .when('GET', 'http://geoip.nekudo.com/api')
      .respond(400, { error: 'error in calling api' });

    GeoIpService.getLocation(function(data){

    },
    function(error){
      expect(error.data).toEqual({ error: 'error in calling api' });
    });

    $httpBackend.flush();

  }));

});
