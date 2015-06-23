'use strict';

var app = angular.module('isa')

app.config('$stateProvider', function($stateProvider) {
    $stateProvider.state('module', {
        url : '/organisation/:orgId/module/:moduleId',
        abstract: true,
        template: '<ui-view/>',
        resolve: {
            module: ['$meteor', '$stateParams', function($meteor, $stateParams) {
                return $meteor.object(Modules, $stateParams.moduleId)
            }]
        }
    });
});

app.run(['$rootScope', 'CurrentOrg', function($rootScope, CurrentOrg) {
    $rootScope.$on('$stateChangeStart', function(from, to) {
        CurrentOrg.id = to.params.orgId;
    });
}]);
