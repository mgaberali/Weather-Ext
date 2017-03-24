angular.module('weatherExtApp').factory('GeoIpService', ['$http', 'GEOIP_API_URL',
    function($http, GEOIP_API_URL) {

        var factory = {};

        factory.getLocation = function(callback){

          $http({
            method: "GET",
            url: GEOIP_API_URL
          }).then(function success(response){
            callback(response.data);
          },
          function fail(error){
            console.log(error);
          });

        };

        return factory;
    }
]);
