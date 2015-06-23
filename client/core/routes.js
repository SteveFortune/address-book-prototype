'use strict';

var app = angular.module('isa')

app.state('module', {
    url : '/organisation/:orgId/module/:moduleId',
    abstract: true,
    template: '<ui-view/>',
    resolve: {
        module: ['$meteor', '$stateParams', function($meteor, $stateParams) {
            return $meteor.collection(Modules)
        }]
    }
});
