'use strict';

/* Filters */

var AppFilters = angular.module('OnlineMovieTicketApp.filters', []);

AppFilters.filter('byCategory', function () {
    return function (data, cat) {
        var filterd = [];
        for (var i = 0; i < data.length; i++) {
            var value = data[i];
            if (value.row == cat) {
                filterd.push(value);
            }
        }
        return filterd;
    }
});