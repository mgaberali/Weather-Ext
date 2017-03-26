'use strict';

describe('Controller: Popup', function () {

  // load the controller's module
  beforeEach(module('weatherExtApp'));

  var popupCtrl,
    scope;

  var weatherData = {
        "city": {
          "id": 360630,
          "name": "Cairo",
          "coord": {
            "lon": 31.24967,
            "lat": 30.06263
          },
          "country": "EG",
          "population": 0
        },
        "cod": "200",
        "message": 0.0082,
        "cnt": 7,
        "list": [
          {
            "dt": 1490522400,
            "temp": {
              "day": 17.48,
              "min": 12.34,
              "max": 17.48,
              "night": 12.34,
              "eve": 17.48,
              "morn": 17.48
            },
            "pressure": 1016.58,
            "humidity": 45,
            "weather": [
              {
                "id": 801,
                "main": "Clouds",
                "description": "few clouds",
                "icon": "02n"
              }
            ],
            "speed": 1.42,
            "deg": 357,
            "clouds": 12
          },
          {
            "dt": 1490608800,
            "temp": {
              "day": 24.67,
              "min": 6.88,
              "max": 25.48,
              "night": 15.42,
              "eve": 23.97,
              "morn": 6.88
            },
            "pressure": 1016.81,
            "humidity": 29,
            "weather": [
              {
                "id": 802,
                "main": "Clouds",
                "description": "scattered clouds",
                "icon": "03d"
              }
            ],
            "speed": 1.78,
            "deg": 4,
            "clouds": 44
          },
          {
            "dt": 1490695200,
            "temp": {
              "day": 23.78,
              "min": 7.73,
              "max": 27.35,
              "night": 14.52,
              "eve": 26.5,
              "morn": 7.73
            },
            "pressure": 1016.34,
            "humidity": 31,
            "weather": [
              {
                "id": 800,
                "main": "Clear",
                "description": "clear sky",
                "icon": "01d"
              }
            ],
            "speed": 1.87,
            "deg": 1,
            "clouds": 0
          },
          {
            "dt": 1490781600,
            "temp": {
              "day": 26.52,
              "min": 9.06,
              "max": 28.05,
              "night": 16.47,
              "eve": 26.91,
              "morn": 9.06
            },
            "pressure": 1016.35,
            "humidity": 27,
            "weather": [
              {
                "id": 803,
                "main": "Clouds",
                "description": "broken clouds",
                "icon": "04d"
              }
            ],
            "speed": 3.28,
            "deg": 214,
            "clouds": 80
          },
          {
            "dt": 1490868000,
            "temp": {
              "day": 25.95,
              "min": 11.94,
              "max": 25.95,
              "night": 11.94,
              "eve": 20.2,
              "morn": 18.05
            },
            "pressure": 1012.48,
            "humidity": 0,
            "weather": [
              {
                "id": 800,
                "main": "Clear",
                "description": "clear sky",
                "icon": "01d"
              }
            ],
            "speed": 5.07,
            "deg": 242,
            "clouds": 0
          },
          {
            "dt": 1490950800,
            "temp": {
              "day": 23.16,
              "min": 12.72,
              "max": 23.16,
              "night": 12.72,
              "eve": 18.36,
              "morn": 14.93
            },
            "pressure": 1012.16,
            "humidity": 0,
            "weather": [
              {
                "id": 500,
                "main": "Rain",
                "description": "light rain",
                "icon": "10d"
              }
            ],
            "speed": 6.6,
            "deg": 257,
            "clouds": 15,
            "rain": 1.16
          },
          {
            "dt": 1491037200,
            "temp": {
              "day": 24.08,
              "min": 9.86,
              "max": 24.08,
              "night": 9.86,
              "eve": 18.45,
              "morn": 14.83
            },
            "pressure": 1015.42,
            "humidity": 0,
            "weather": [
              {
                "id": 500,
                "main": "Rain",
                "description": "light rain",
                "icon": "10d"
              }
            ],
            "speed": 3.48,
            "deg": 301,
            "clouds": 0,
            "rain": 1.31
          }
        ]
      };

  var imageUrl = "http://google.com/pic1";

  var timeout;

  var googlePlacesService = {};
  googlePlacesService.getImageForCity = function(cityName, callback){
    callback(imageUrl);
  };

  var weatherModel = {};
  weatherModel.getWeatherForecast = function(callBack, isBackgroundScript, errorCallBack){
    callBack(weatherData);
  };

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $timeout) {
    scope = $rootScope.$new();
    timeout = $timeout;
    popupCtrl = $controller('PopupController', {
      $scope: scope,
      WeatherModel: weatherModel,
      GooglePlacesService: googlePlacesService
    });
  }));

  it('should display weather data', function () {

    expect(scope.city).toEqual(weatherData.city.name + ', ' + weatherData.city.country);
    expect(scope.cityImageUrl).toEqual("url('http://google.com/pic1') no-repeat");
    expect(scope.today.temp).toBe(weatherData.list[0].temp.day | 0);
    expect(scope.today.weather).toEqual(weatherData.list[0].weather[0].main);

  });

  it('should display error page when there is an error when getting weather', function () {

    var weatherModel2 = {};
    weatherModel2.getWeatherForecast = function(callBack, isBackgroundScript, errorCallBack){
      errorCallBack("Error");
    };

    inject(function ($controller, $rootScope) {
      scope = $rootScope.$new();
      popupCtrl = $controller('PopupController', {
        $scope: scope,
        WeatherModel: weatherModel2,
        GooglePlacesService: googlePlacesService
      });
    });

    expect(scope.showErrorPage).toBe(true);

  });

});
