'use strict';
var AngularLessons = {};

google.charts.load('current', {packages: ['corechart','bar']});
google.charts.setOnLoadCallback(function () {
    angular.bootstrap(document.body, ['WhirlpoolDashboard']);
});
// constants
var App = angular.module('WhirlpoolDashboard', ['ngRoute', 'smart-table', 'AngularLessons.directives', 'AngularLessons.services', 'AngularLessons.filters']).config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {

    }]);
App.constant('URL_LINKS', {
    path: '/WhirlpoolDashboard/',
    colorsarr: ['#66CC00', '#FFFF33', '#FF0000'],
    colors: [{
            "id": 1,
            "type": ">85%",
            "min": 85,
            "max": 100,
            "color": "#66CC00",
            "fontcolor": "white",
            "colorname": "Green"
        },
        {
            "id": 2,
            "type": "80-85%",
            "min": 80,
            "max": 85,
            "color": "#FFFF33",//FFFF33,f2b413
            "fontcolor": "black",
            "colorname": "Yellow"
        }, {
            "id": 3,
            "type": "<80%",
            "min": 0,
            "max": 80,
            "color": "#FF0000",
            "fontcolor": "white",
            "colorname": "Red"
        }]
});
App.run(function ($rootScope, $http, $timeout, $interval) {
    $rootScope.notifier = function (params, callback) {
        $rootScope.error = {}
        $rootScope.error.type = params.type || "message"; //there is also a confirm type which shows Yes and No buttons
        $rootScope.error.title = params.title || "error";
        $rootScope.error.choices = params.choices || [];
        $rootScope.error.notification = params.notification || "Oops! Something went wrong!";
        $("#error-module").modal('show');

        if (params.title == "timeout") {
            $timeout(function () {
                $user.logout();
            }, 2000)
        }

        $rootScope.errorResolution = function (status, value) {
            $("#error-module").modal('hide');
            callback(status, value);
        }
    }
    $rootScope.confirmationAlert = function (params) {
        $rootScope.confirmation = {}
        $rootScope.confirmation.title = params.title || "success";
        $rootScope.confirmation.notification = params.notification;
        $("#confirmation-module").modal('show');
        $timeout(function () {
            $("#confirmation-module").modal('hide');
        }, 2000);
    }
});