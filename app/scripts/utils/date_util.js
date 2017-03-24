angular.module('weatherExtApp').factory('DateUtil', [
    function() {

        var factory = {};

        factory.formatDate = function (date) {
          var monthNames = [
            "January", "February", "March",
            "April", "May", "June", "July",
            "August", "September", "October",
            "November", "December"
          ];

          var day = date.getDate();
          var monthIndex = date.getMonth();
          var year = date.getFullYear();

          var ordinalNumberSuffix = 'th';

          switch(day){
            case 1: ordinalNumberSuffix = 'st'; break;
            case 2: ordinalNumberSuffix = 'nd'; break;
            case 3: ordinalNumberSuffix = 'rd'; break;
          }

          return monthNames[monthIndex] + ' ' + day + ordinalNumberSuffix + ', ' + year;
        }

        factory.getDayOfWeek = function(date) {

          var day = date.getDay();
          var days = ['SUN','MON','TUE','WED','THU','FRI','SAT'];
          return days[day];
        };

        return factory;
    }
]);
