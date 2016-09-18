(function () {
  'use strict';

  angular
  .module('<%= name %>')
  .controller('homeController', homeController);

  function homeController() {
    var vm = this;

    angular.extend(vm, {
      publicFunction: publicFunction
    });

    activate();

    function activate() {
      vm.awesomeThings = [
        'HTML5 Boilerplate',
        'AngularJS',
        'Karma'
      ];
    }

    function publicFunction() {
    }
  }
})();
