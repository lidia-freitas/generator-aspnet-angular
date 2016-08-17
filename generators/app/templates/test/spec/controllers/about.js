(function () {
    'use strict';

    describe('Controller: aboutController', function () {

        // load the controller's module
        beforeEach(module('<%= name %>'));

        var aboutController,
        scope;

        // Initialize the controller and a mock scope
        beforeEach(inject(function ($controller, $rootScope) {
            scope = $rootScope.$new();
            aboutController = $controller('aboutController', {
                $scope: scope
                // place here mocked dependencies
            });
        }));

        it('should attach a list of awesomeThings to the scope', function () {
            expect(aboutController.awesomeThings.length).toBe(3);
        });
    });

})();
