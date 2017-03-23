'use strict';

/**
 * @ngdoc overview
 * @name weatherExtApp
 * @description
 * # weatherExtApp
 *
 * Main module of the application.
 */
angular
  .module('weatherExtApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/popup.html',
        controller: 'PopupController',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
