'use strict';

var OnlineMovieTicketApp = angular.module('OnlineMovieTicket', ['ngRoute', 'OnlineMovieTicketApp.directives', 'OnlineMovieTicketApp.filters']).config(['$routeProvider', function ($routeProvider) {
$routeProvider
        .when('/index/:viewmode', {
            templateUrl: 'html/home.html',
            controller: 'movieStubController'
        }).when('/date', {
            templateUrl: 'html/selectdate.html',
            controller: 'movieDateTimeDetailsController'
        }).when('/seats', {
            templateUrl: 'html/selectseats.html',
            controller: 'movieSelectSeatsController'
        }).otherwise({
            redirectTo: '/index/cinemas'
        });
    }]);

OnlineMovieTicketApp.constant('APP_CONST', {
    path: ContextPath
});
OnlineMovieTicketApp.run(['$rootScope',
    function ($rootScope) {
        $rootScope.appendToArray = function (obj, arr) {
            if (arr.indexOf(obj) == -1) {
                arr.push(obj);
            }
        };
        $rootScope.prependToArray = function (obj, arr) {
            if (arr.indexOf(obj) == -1) {
                arr.unshift(obj);
            }
        };
        $rootScope.removeFromArray = function (obj, arr) {
            arr.splice(arr.indexOf(obj), 1);
        };
         $rootScope.addToSessionStorage = function (param, value) {
            sessionStorage.setItem(param, angular.toJson(value));//sessionstorage close when tab close
//            localStorage.setItem('mydata', angular.toJson($scope.blockaccounts));// local storage will be closed when borser catch is removed
        };
        $rootScope.getDataFromSessionStorage = function (param) {
            return JSON.parse(sessionStorage.getItem(param));
//            localStorage.getItem('mydata', angular.toJson($scope.blockaccounts));
        };
        $rootScope.capitalizeFirstLetter = function (string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        };
        $rootScope.back = function () {
            window.history.back();
        };
    }]);

