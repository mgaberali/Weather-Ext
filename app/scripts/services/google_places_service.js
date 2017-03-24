angular.module('weatherExtApp').factory('GooglePlacesService', [
    function() {

        var factory = {};

        factory.getImageForCity = function(cityName, callback){

          var service = new google.maps.places.PlacesService(document.getElementById('main'));
          service.textSearch({query: "landmarks+in+"+cityName}, function(data){
            callback(data[0].photos[0].getUrl({maxWidth: 600}));
          });

        };

        return factory;
    }
]);
