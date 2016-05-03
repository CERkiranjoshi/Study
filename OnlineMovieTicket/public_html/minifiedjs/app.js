"use strict";var OnlineMovieTicketApp=angular.module("OnlineMovieTicket",["ngRoute","OnlineMovieTicketApp.directives","OnlineMovieTicketApp.filters"]).config(["$routeProvider",function(e){e.when("/index/:viewmode",{templateUrl:"html/home.html",controller:"movieStubController"}).when("/date",{templateUrl:"html/selectdate.html",controller:"movieDateTimeDetailsController"}).when("/seats",{templateUrl:"html/selectseats.html",controller:"movieSelectSeatsController"}).otherwise({redirectTo:"/index/cinemas"})}]);OnlineMovieTicketApp.constant("APP_CONST",{path:ContextPath}),OnlineMovieTicketApp.run(["$rootScope",function(e){e.appendToArray=function(e,t){-1==t.indexOf(e)&&t.push(e)},e.prependToArray=function(e,t){-1==t.indexOf(e)&&t.unshift(e)},e.removeFromArray=function(e,t){t.splice(t.indexOf(e),1)},e.addToSessionStorage=function(e,t){sessionStorage.setItem(e,angular.toJson(t))},e.getDataFromSessionStorage=function(e){return JSON.parse(sessionStorage.getItem(e))},e.capitalizeFirstLetter=function(e){return e.charAt(0).toUpperCase()+e.slice(1)},e.back=function(){window.history.back()}}]);