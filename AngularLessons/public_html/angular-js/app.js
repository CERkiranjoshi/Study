'use strict';
var AngularLessons = {};
var App = angular.module('AngularLessons', ['ngRoute', 'ngSanitize', 'ngCookies', 'logger', 'ngAnimate', 'AngularLessons.directives', 'AngularLessons.services', 'AngularLessons.filters']).config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {
        $routeProvider.
                when('/changeroutes/:viewmode', {templateUrl: 'routes.html', controller: "routeExample"}).
                when('/services/httpservices', {templateUrl: 'httpservices.html', controller: "httpServices"}).
                when('/services/all', {templateUrl: 'servicetypes.html', controller: "serviceTypes"}).
                when('/services/service', {templateUrl: 'serviceexample.html', controller: "ContactController"}).
                when('/changeroutes', {templateUrl: 'routes.html', controller: "routeExample"}).
                when('/example', {templateUrl: 'example.html', controller: "angularjsExample"}).
                when('/cookies', {templateUrl: 'cookies.html', controller: "CookiesController"}).
                when('/groupadd', {templateUrl: 'groupadd.html', controller: "groupController"}).
                when('/insidectrl', {templateUrl: 'multiController.html', controller: "multiController2"}).
                otherwise({
                    redirectTo: '/example'
                });
    }]);

// constants

App.constant('URL_LINKS', {
    path: '/AngularLessons/'
});
App.config(['LoggerProvider', function (LoggerProvider) {
        LoggerProvider.log(true);
        LoggerProvider.warn(true);
        LoggerProvider.error(true);
        LoggerProvider.debug(true);
    }])
App.run(function ($rootScope, $http, $timeout,$interval) {
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
    $rootScope.clearInterval = function () {
        if (angular.isDefined($rootScope.countPromiseInterval)) {
            $interval.cancel($rootScope.countPromiseInterval);
        }
    }
});