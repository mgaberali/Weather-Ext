'use strict';

angular.module('weatherExtApp')
  .filter('weatherToClass', function(CONDITIONS){
    return function(weather){

      var wiClass = "";

      if(weather === CONDITIONS.CLEAR)
        wiClass = "wi-day-sunny sun";
      else if(weather === CONDITIONS.RAIN)
        wiClass = "wi-showers rain";
      else if(weather === CONDITIONS.SNOW)
        wiClass = "wi-snowflake-cold snow";
      else if(weather === CONDITIONS.CLOUDS)
        wiClass = "wi-day-cloudy cloud";
      else if(weather === CONDITIONS.THUNDER_STORM)
        wiClass = "wi-thunderstorm storm";

       return wiClass;

    }
  });
