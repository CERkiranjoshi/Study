'use strict';
var bajajfinserv = {};
var App = angular.module('bajajfinserv', ['ngRoute', 'bajajfinserv.directives','bajajfinserv.services']).config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {
//        $routeProvider.
//                when('/rca/:viewmode', {templateUrl: '../PixelAdmin-1.3.0/html/rcaListPage.jsp', controller: "RcaController"}).
//                when('/rca/:viewmode/:rcaid', {templateUrl: '../PixelAdmin-1.3.0/html/RcaInnerHtml.jsp', controller: "RcaController"}).
//                otherwise({redirectTo: '/rca/create/0'});
    }]);

// constants

// App.constant('URL_LINKS', {
// mwpURL :'/mwpusdclient',
// webURL:'/web-uat'
// });
App.run(function ($rootScope, $http) {
    // Here be global functions and variables
//    setTimeout(function () {
//        $rootScope.userId = 'customer2';
//        console.log($rootScope.userId);
//    }, 20000);
//
//    $rootScope.openModal = function () {
//        document.getElementById('modal').style.display = 'block';
//        document.getElementById('fade').style.display = 'block';
//    }
//
//    $rootScope.closeModal = function () {
//        document.getElementById('modal').style.display = 'none';
//        document.getElementById('fade').style.display = 'none';
//    }
    // Constants - do not modify this object!
//    $http.post('../source/controllers/locations.php', {action: "get_constants"}).success(function (response) {
//        $rootScope.CONSTANTS = response.data
//    });
});