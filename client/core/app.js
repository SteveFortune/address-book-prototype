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

app.run(['$rootScope', '$state', function($rootScope, $state) {
    $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
        switch (error) {
            case "AUTH_REQUIRED":
            case "FORBIDDEN":
            case "UNAUTHORIZED":
                $state.go('login');
                break;
        }
    });
}]);

app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'client/login.ng.html'
        })
        .state('addressbook', {
            url: '/addressbook',
            templateUrl: 'client/addressBook.ng.html',
            controller: 'AddressBookCtrl',
            resolve: {
                identity: ["$meteor", function($meteor){
                    return $meteor.requireUser();
                }]
            }
        })
        .state('user', {
            url: '/:userId',
            parent: 'addressbook',
            templateUrl: 'client/viewUser.ng.html',
            resolve: {
                /// @note Why should we have to do this? This should inherit and we should trigger
                /// it to be resolved regardless of whether the routes are nested..
                identity: ["$meteor", function($meteor){
                    return $meteor.requireUser();
                }],
                user: ['$stateParams', '$meteor', function($stateParams, $meteor) {
                    var user = $meteor.object(Meteor.users, $stateParams.userId, false);
                    return user;
                }]
            },
            controller: 'UserCtrl'
        });
    $urlRouterProvider.otherwise('/addressbook');
}]);

app.controller('UserCtrl', ['$mdDialog', '$scope', '$meteor', 'user', function($mdDialog, $scope, $meteor, user) {

    var users = $meteor.collection(Meteor.users);

    $scope.user = user || {};

    $scope.edit = function() {
        $mdDialog.show({
            parent: angular.element(document.body),
            templateUrl: 'client/editUser.ng.html',
            controller: 'UserCtrl',
            resolve: {
                user: function() {
                    return $scope.user;
                }
            }
        });
    };

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

}]);
