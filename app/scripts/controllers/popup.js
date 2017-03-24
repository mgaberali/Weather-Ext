'use strict';

angular.module('weatherExtApp')
  .controller('PopupController', ['$scope', 'WeatherService', 'GeoIpService', 'WEATHER_API_UNITS', 'DateUtil', 'GooglePlacesService',
   function($scope, WeatherService, GeoIpService, WEATHER_API_UNITS, DateUtil, GooglePlacesService){

    $scope.cityImageUrl = 'url(\'images/banner.jpg\') no-repeat';

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position){

        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;

        WeatherService.getDailyForecastByCoordinates(latitude, longitude, WEATHER_API_UNITS.CELSIUS, function(data){
          displayWeather(data);
        });

      });

    } else {

      GeoIpService.getLocation(function(location){

        WeatherService.getDailyForecastByCity(location.city, location.country.code, WEATHER_API_UNITS.CELSIUS, function(data){
          displayWeather(data);
        });

      });

    }

    function displayWeather(weatherData){
      $scope.unit = 'C';

      $scope.city = weatherData.city.name + ', ' + weatherData.city.country;

       GooglePlacesService.getImageForCity(weatherData.city.name, function(imageUrl){

           $scope.$apply(function () {
              $scope.cityImageUrl = 'url(\''+ imageUrl +'\') no-repeat';
           });

       });

      var todayWeatherData = weatherData.list[0];
      var todayDate = new Date(todayWeatherData.dt*1000);

      $scope.today = {
        date: DateUtil.formatDate(todayDate),
        temp: todayWeatherData.temp.day | 0,
        weather: todayWeatherData.weather[0].main
      };

      $scope.nextDays = [];

      for(var i = 1; i <= 5; i++) {

        var dayData = weatherData.list[i];
        var date = new Date(dayData.dt*1000)
        $scope.nextDays.push({name: DateUtil.getDayOfWeek(date),
                              temp: dayData.temp.day | 0,
                              weather: dayData.weather[0].main});


      }

    }

  }]);
