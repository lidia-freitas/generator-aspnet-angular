(function () {

    'use strict';

    describe('Controller: homeController', function () {

        // load the controller's module
        beforeEach(module('<%= name %>'));

        var homeController,
        scope;

        // Initialize the controller and a mock scope
        beforeEach(inject(function ($controller, $rootScope) {
            scope = $rootScope.$new();
            homeController = $controller('homeController', {
                $scope: scope
                // place here mocked dependencies
            });
        }));

        it('should attach a list of awesomeThings to the scope', function () {
            expect(homeController.awesomeThings.length).toBe(3);
        });
    });
})();
