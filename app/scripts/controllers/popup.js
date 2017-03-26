'use strict';

angular.module('weatherExtApp')
  .controller('PopupController', ['$scope', 'DateUtil', 'GooglePlacesService', 'WeatherModel',
   function($scope, DateUtil, GooglePlacesService, WeatherModel){

    $scope.cityImageUrl = 'url(\'images/banner.jpg\') no-repeat';
    $scope.showErrorPage = false;
    $scope.showLoadingPage = true;

    getWeather();

    $scope.retry = function(){
      $scope.showLoadingPage = true;
      $scope.showErrorPage = false;
      getWeather();
    }

    function getWeather(){
     WeatherModel.getWeatherForecast(function(weatherData){

        displayWeather(weatherData);

        setTimeout(function(){
          $scope.$apply(function(){
            $scope.showLoadingPage = false;
            $scope.showErrorPage = false;
          });

        }, 500);


        }, false,
        function(error){
          $scope.showErrorPage = true;
          setTimeout(function(){
            $scope.$apply(function(){
              $scope.showLoadingPage = false;
              $scope.showErrorPage = true;
            });
          }, 500);

        });
    }

    function displayWeather(weatherData){
      $scope.unit = 'C';

      $scope.city = weatherData.city.name + ', ' + weatherData.city.country;

       GooglePlacesService.getImageForCity(weatherData.city.name, function(imageUrl){

           $scope.$apply(function(){
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
