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

app.controller('UserCtrl', ['$mdDialog', '$scope', 'users', function($mdDialog, $scope, users) {

    $scope.user = {
        phoneNumbers: []
    };

    $scope.addPhoneNumber = function() {
        $scope.user.phoneNumbers.push({});
    };
    $scope.save = function() {
        users.save($scope.user);
        $mdDialog.hide();
    };
    $scope.cancel = function() {
        $mdDialog.hide();
    };

}]);

app.controller('AddressBookCtrl', ['$scope', '$meteor', '$meteorUtils', '$mdDialog', function($scope, $meteor, $meteorUtils, $mdDialog) {

    $scope.selectStates = [ 'Users', 'Contacts', 'In call tree', 'Not in call tree' ];
    $scope.user = {};
    $scope.users = $meteor.collection(Meteor.users).subscribe('users');

    $scope.addUser = function() {
        $mdDialog.show({
            templateUrl: 'client/newUser.ng.html',
            controller: 'UserCtrl',
            locals: {
                users: $scope.users
            }
        });
    };

    $scope.editUser = function() {
        $mdDialog.show({
            templateUrl: 'client/editUser.ng.html',
            controller: 'UserCtrl',
            locals: {
                users: $scope.users
            }
        });
    };

}]);

app.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('addressbook', {
        url : '/addressbook/:userId',
        templateUrl: '/client/addressbook.ng.html',
        controller: 'AddressBookCtrl'
    });
}]);
