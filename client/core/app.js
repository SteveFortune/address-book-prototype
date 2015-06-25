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

app.controller('UserCtrl', ['$mdDialog', '$scope', '$meteor', function($mdDialog, $scope, $meteor) {

    var users = $meteor.collection(Meteor.users);
    $scope.isNew = !$scope.user;
    $scope.user = angular.copy($scope.user) || {};

    $scope.addPhoneNumber = function() {
        if (!$scope.user.phoneNumbers) {
            $scope.user.phoneNumbers = [];
        }
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

app.controller('AddressBookCtrl', ['$scope', '$meteor', '$mdDialog', function($scope, $meteor, $mdDialog) {

    $scope.selectStates = [ 'Users', 'Contacts', 'In call tree', 'Not in call tree' ];
    $scope.users = $meteor.collection(Meteor.users).subscribe('users');

    $scope.addUser = function() {
        $mdDialog.show({
            templateUrl: 'client/newUser.ng.html',
            controller: 'UserCtrl'
        });
    };

    $scope.editUser = function(user) {
        $mdDialog.show({
            templateUrl: 'client/editUser.ng.html',
            controller: 'UserCtrl',
            locals: {
                user: user
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
