angular.module('weatherExtApp').factory('WeatherService', ['$http', 'WEATHER_API_URL', 'WEATHER_API_KEY', 'FORECAST_DAILY_URI', 'CURRENT_WEATHER_URI',
    function($http, WEATHER_API_URL, WEATHER_API_KEY, FORECAST_DAILY_URI, CURRENT_WEATHER_URI) {

        var factory = {};

        factory.getDailyForecastByCoordinates = function(lat, long, unit, callback, failCallback){

          $http({
            method: "GET",
            url: WEATHER_API_URL + FORECAST_DAILY_URI + "?lat=" + lat + "&lon=" + long + "&APPID=" + WEATHER_API_KEY + "&units=" + unit + "&cnt=7"
          }).then(function success(response){
            callback(response.data);
          },
          function fail(error){
            console.log(error);
            if(failCallback){
              failCallback(error);
            }
          });

        };

        factory.getDailyForecastByCity = function(city, countryCode, unit, callback, failCallback){

          $http({
            method: "GET",
            url: WEATHER_API_URL + FORECAST_DAILY_URI + "?q=" + city + "," + countryCode + "&APPID=" + WEATHER_API_KEY + "&units=" + unit + "&cnt=7"
          }).then(function success(response){
            callback(response.data);
          },
          function fail(error){
            console.log(error);
            if(failCallback){
              failCallback(error);
            }
          });

        };

        return factory;
    }
]);
