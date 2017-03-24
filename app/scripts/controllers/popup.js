'use strict';

angular.module('weatherExtApp')
  .controller('PopupController', ['$scope', 'WeatherService', 'GeoIpService',
   function($scope, WeatherService, GeoIpService){


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
