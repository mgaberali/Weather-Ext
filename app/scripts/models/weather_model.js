angular.module('weatherExtApp').factory('WeatherModel', ['WeatherService', 'GeoIpService', 'WEATHER_API_UNITS', 'GooglePlacesService', 'PreferencesService',
    function(WeatherService, GeoIpService, WEATHER_API_UNITS, GooglePlacesService, PreferencesService) {

        var factory = {};

        factory.getWeatherForecast = function (callback, isBackgroundScript){

          GeoIpService.getLocation(function(location){

            if(!isBackgroundScript){
              var oldCity = PreferencesService.getCity();
              if(oldCity && oldCity.city === location.city && oldCity.countryCode === location.country.code){
                var oldWeatherData = PreferencesService.getWeatherData();
                callback(oldWeatherData);
                return;
              }
            }

            // store city
            PreferencesService.setCity({city: location.city, countryCode: location.country.code});

            // Call weather API
            WeatherService.getDailyForecastByCity(location.city, location.country.code, WEATHER_API_UNITS.CELSIUS, function(data){
              PreferencesService.setWeatherData(data);
              callback(data);
            });

          });

        };

        function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
          var R = 6371; // Radius of the earth in km
          var dLat = deg2rad(lat2-lat1);  // deg2rad below
          var dLon = deg2rad(lon2-lon1);
          var a =
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
            Math.sin(dLon/2) * Math.sin(dLon/2)
            ;
          var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
          var d = R * c; // Distance in km
          return d;
        };

        function deg2rad(deg) {
          return deg * (Math.PI/180)
        };

        return factory;
    }
]);

/*if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position){

              var latitude = position.coords.latitude;
              var longitude = position.coords.longitude;

              if(!isBackgroundScript){

                var oldCoords = PreferencesService.getLocationCoords();

                // check if new coords is not far form old coords then return old weahter data from cookies
                if(oldCoords){
                  var distanceDiff = getDistanceFromLatLonInKm(latitude, longitude, oldCoords.lat, oldCoords.lon);

                  if(distanceDiff < 3){
                    var oldWeatherData = PreferencesService.getWeatherData();
                    callback(oldWeatherData);
                    return;
                  }
                }
              }

              // store coords into cookies
              PreferencesService.setLocationCoords({lat: latitude, lon: longitude});

              // call weather api
              WeatherService.getDailyForecastByCoordinates(latitude, longitude, WEATHER_API_UNITS.CELSIUS, function(data){

                PreferencesService.setWeatherData(data);
                callback(data);
              });

            },
            function(error){
              console.log("Error when get current position");
              alert('ERROR(' + error.code + '): ' + error.message);
            });

          }*/
