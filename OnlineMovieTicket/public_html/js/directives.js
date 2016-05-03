'use strict';
/* Directives */
var AppDirectives = angular.module('OnlineMovieTicketApp.directives', []);

AppDirectives.directive('ngcBootstrapTooltip', function factory() {
    // use this directive to initialize a bootstrap tooltip on an element
    return function (scope, element, attrs) {
        scope.$watch(attrs.ngcBootstrapTooltip, function ngWatchAction(value) {
            element.tooltip();
        });
    }
});
AppDirectives.directive('genre', function () {
    return {
        restrict: 'E', // A match with only matches attribute name , E Element Name, C Class name
        link: function ($scope, element, attributes) {
            var temp = attributes.data.split(',');
            var html = "";
            angular.forEach(temp, function (val) {
                html += '<button type="button" class="btn btn-warning btn-xs  btn-custom-radius">' + val + '</button>';
            });
            element.html(html);
        }
    }
});