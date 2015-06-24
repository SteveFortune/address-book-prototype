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

app.controller('NewUserCtrl', ['$mdDialog', '$scope', function($mdDialog, $scope) {

    $scope.newUser = {};
    $scope.hide = function() {
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
            onComplete: function(scope) {
                $scope.users.save(scope.newUser);
                $scope.newUser = {};
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
