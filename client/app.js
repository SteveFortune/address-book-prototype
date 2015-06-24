'use strict';

var app = angular.module('addressbook', [
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

app.controller('AddressBookCtrl', ['$scope', '$meteor', '$meteorUtils', function($scope, $meteor, $meteorUtils) {

    $scope.newUser = {};
    $scope.users = $meteor.collection(Meteor.users);

    $scope.addUser = function() {
        console.log("Adding user:");
        console.log($scope.newUser);
        $scope.users.save($scope.newUser);
        console.log($scope.users);
    };

}]);

app.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('addressbook', {
        url : '/addressbook/:userId',
        templateUrl: '/client/addressbook.ng.html',
        controller: 'AddressBookCtrl'
    });
}]);
