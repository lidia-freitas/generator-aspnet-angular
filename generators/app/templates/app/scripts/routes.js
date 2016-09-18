(function () {
  'use strict';

  angular
  .module('<%= name %>')
  .config(route);

  function route($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $routeProvider
    .when('/home', {
      templateUrl: 'scripts/home/home.html',
      controller: 'homeController',
      controllerAs: 'homeCtrl'
    })
    .when('/about', {
      templateUrl: 'scripts/about/about.html',
      controller: 'aboutController',
      controllerAs: 'aboutCtrl'
    })
    .otherwise({
      redirectTo: '/home'
    });
  }
})();
