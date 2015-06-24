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

app.controller('NewUserCtrl', ['$mdDialog', '$scope', 'users', function($mdDialog, $scope, users) {

    $scope.newUser = {};
    $scope.register = function() {
        users.save($scope.newUser);
        $mdDialog.hide();
    };
    $scope.cancel = function() {
        $mdDialog.hide();
    };

}]);

app.controller('AddressBookCtrl', ['$scope', '$meteor', '$meteorUtils', '$mdDialog', function($scope, $meteor, $meteorUtils, $mdDialog) {

    $scope.selectStates = [ 'Users', 'Contacts', 'In call tree', 'Not in call tree' ];
    $scope.newUser = {};
    $scope.users = $meteor.collection(Meteor.users).subscribe('users');

    $scope.addUser = function() {
        $mdDialog.show({
            templateUrl: 'client/newUser.ng.html',
            controller: 'NewUserCtrl',
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
