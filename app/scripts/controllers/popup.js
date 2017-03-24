'use strict';

angular.module('weatherExtApp')
  .controller('PopupController', ['$scope', 'WeatherService', 'GeoIpService',
   function($scope, WeatherService, GeoIpService){

    $scope.unit = 'C';

    $scope.today = {
      date: "January 29th, 2015",
      temp: 14,
      weather: "Clouds"
    };

    $scope.nextDays = [];
    $scope.nextDays.push({name: 'WED', temp: -2, weather: 'Snow'});
    $scope.nextDays.push({name: 'THR', temp: 2, weather: 'Clouds'});
    $scope.nextDays.push({name: 'FRI', temp: 5, weather: 'Rain'});
    $scope.nextDays.push({name: 'SAT', temp: 14, weather: 'Clear'});
    $scope.nextDays.push({name: 'SUN', temp: 10, weather: 'Thunderstorm'});

    $scope.city = "Cairo, Egypt";

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position){

        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;

        WeatherService.getWeatherByCoordinates(latitude, longitude, 'metric', function(data){
          $scope.test = data.city.name;
        });

      });

    } else {

      GeoIpService.getLocation(function(location){

        WeatherService.getWeatherByCity(location.city, location.country.code, 'metric', function(data){
          $scope.test = data.city.name;
        });

      });

    }

  }]);
