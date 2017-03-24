angular.module('weatherExtApp').factory('WeatherService', ['$http', 'WEATHER_API_URL', 'WEATHER_API_KEY',
    function($http, WEATHER_API_URL, WEATHER_API_KEY) {

        var factory = {};

        factory.getWeatherByCoordinates = function(lat, long, unit, callback){

          $http({
            method: "GET",
            url: WEATHER_API_URL + "?lat=" + lat + "&lon=" + long + "&APPID=" + WEATHER_API_KEY + "&unit=" + unit + "&cnt=" + "7"
          }).then(function success(response){
            callback(response.data);
          },
          function fail(error){
            console.log(error);
          });

        };

        factory.getWeatherByCity = function(city, countryCode, unit, callback){

          $http({
            method: "GET",
            url: WEATHER_API_URL + "?q=" + city + "," + countryCode + "&APPID=" + WEATHER_API_KEY + "&unit=" + unit + "&cnt=" + "7"
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
