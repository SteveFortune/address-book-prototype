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

app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider
        .state('addressbook', {
            url: '/addresbook',
            templateUrl: 'client/addressBook.ng.html',
            controller: 'AddressBookCtrl'
        })
        .state('addressbook.user', {
            url: '/addresbook/:userId',
            templateUrl: 'client/viewUser.ng.html',
            resolve: {
                user: ['$stateParams', function($stateParams) {
                    return Meteor.users.findById($stateParams.userId);
                }]
            },
            controller: 'UserCtrl'
        });
    $urlRouterProvider.otherwise('/addressbook');
}]);

app.controller('UserCtrl', ['$mdDialog', '$scope', '$meteor', 'user', function($mdDialog, $scope, $meteor, user) {

    var users = $meteor.collection(Meteor.users);
    $scope.isNew = !$scope.user;
    $scope.user = angular.copy($scope.user) || {};

    $scope.addPhoneNumber = function() {
        if (!$scope.user.phoneNumbers) {
            $scope.user.phoneNumbers = [];
        }
        $scope.user.phoneNumbers.push({});
    };
    $scope.addCallTree = function() {
        if (!$scope.user.callTree) {
            $scope.user.callTree = [];
        }
        $scope.user.callTree.push({});
    };
    $scope.save = function() {
        users.save($scope.user);
        $mdDialog.hide();
    };
    $scope.cancel = function() {
        $mdDialog.hide();
    };

}]);

app.controller('AddressBookCtrl', ['$scope', '$meteor', '$mdDialog', function($scope, $meteor, $mdDialog) {

    $scope.selectStates = [ 'Users', 'Contacts', 'In call tree', 'Not in call tree' ];
    $scope.users = $meteor.collection(Meteor.users).subscribe('users');

    $scope.addUser = function() {
        $mdDialog.show({
            parent: angular.element(document.body),
            templateUrl: 'client/newUser.ng.html',
            controller: 'UserCtrl',
            resolve: {
                user: angular.noop
            }
        });
    };

    $scope.editUser = function(user) {
        $mdDialog.show({
            parent: angular.element(document.body),
            templateUrl: 'client/editUser.ng.html',
            controller: 'UserCtrl',
            resolve: {
                user: function() {
                    return user;
                }
            }
        });
    };

}]);
