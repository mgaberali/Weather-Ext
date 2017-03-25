'use strict';

angular.module('weatherExtApp')
  .controller('BackgroundController', ['WeatherModel',
   function(WeatherModel){

    checkWeather();

    // Check weather every one hour
    var oneHour = 1000 * 60 * 60;
    setInterval(checkWeather, oneHour);

    function checkWeather(){
      WeatherModel.getWeatherForecast(function(weatherData){

        var temp = weatherData.list[0].temp.day | 0;
        console.log(temp);
        chrome.browserAction.setBadgeText({text: temp + "°C"});

      }, true);
    }

  }]);
