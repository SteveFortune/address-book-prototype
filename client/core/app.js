'use strict';

var app = angular.module('isa', [
    'angular-meteor',
    'ui.router',
    'ngMaterial'
]);

var boot = function() {
    angular.bootstrap(document, [ 'addressbook' ]);
};

if (Meteor.isCordova) {
    angular.element(document).on("deviceready", boot);
} else {
    angular.element(document).ready(boot);
}

app.controller('AddressBookCtrl', function() {

});

app.config('$stateProvider', function($stateProvider) {
    $stateProvider.state('addressbook', {
        url : '/addressbook/:userId',
        templateUrl: '/client/address-book.html',
        controller: 'AddressBookCtrl'
    });
});
