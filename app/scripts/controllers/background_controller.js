'use strict';

angular.module('weatherExtApp')
  .controller('BackgroundController', ['WeatherModel', 'BrowserUtil',
   function(WeatherModel, BrowserUtil){

    checkWeather();

    // Check weather every one hour
    var oneHour = 1000 * 60 * 60;
    setInterval(checkWeather, oneHour);

    function checkWeather(){
      WeatherModel.getWeatherForecast(function(weatherData){

        var api = BrowserUtil.getBrowserApi();

        var temp = weatherData.list[0].temp.day | 0;
        console.log(temp);
        api.browserAction.setBadgeText({text: temp + "°C"});

      }, true);
    }

  }]);
