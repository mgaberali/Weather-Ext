'use strict';

angular.module('weatherExtApp')
  .constant('WEATHER_API_URL', 'http://api.openweathermap.org/data/2.5/forecast/daily')
  .constant('WEATHER_API_KEY', 'a4ae2fd944bec7f3f981ea7c91afd72f')
  .constant('GEOIP_API_URL', 'http://geoip.nekudo.com/api')
  .constant('UNITS', {C: 'c', F: 'f'})
  .constant('CONDITIONS', {
    CLEAR: 'Clear',
    RAIN: 'Rain',
    SNOW: 'Snow',
    CLOUDS: 'Clouds',
    THUNDER_STORM: 'Thunderstorm'
  });

