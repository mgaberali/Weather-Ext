angular.module('weatherExtApp').factory('PreferencesService', ['$cookies',
    function($cookies) {

        var factory = {};

        factory.setWeatherData = function(weatherData){
          $cookies.putObject("weather", weatherData);
        };

        factory.getWeatherData = function(){
          return $cookies.getObject("weather");
        };

        factory.setCityImageUrl = function(cityImageUrl){
          $cookies.put("cityImageUrl", cityImageUrl);
        };

        factory.getCityImageUrl = function(){
          return $cookies.get("cityImageUrl");
        };

        factory.setLocationCoords = function(coords){
          $cookies.putObject("coords", coords);
        };

        factory.getLocationCoords = function(){
          return $cookies.getObject("coords");
        };

        factory.setCity = function(city){
          $cookies.putObject("city", city);
        };

        factory.getCity = function(){
          return $cookies.getObject("city");
        };

        return factory;
    }
]);
