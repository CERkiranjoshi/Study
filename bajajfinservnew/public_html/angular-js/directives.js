'use strict';

/* Directives */

var AppDirectives = angular.module('bajajfinserv.directives', []);

AppDirectives.directive('appVersion', ['version', function (version) {
        return function (scope, elm, attrs) {
            elm.text(version);
        };
    }]);

AppDirectives.directive('validSubmit', ['$parse', function ($parse) {
        return {
            // we need a form controller to be on the same element as this directive
            // in other words: this directive can only be used on a &lt;form&gt;
            require: 'form',
            // one time action per form
            link: function (scope, element, iAttrs, form) {
                form.$submitted = false;

                // get a hold of the function that handles submission when form is valid
                var fn = $parse(iAttrs.validSubmit);

                // register DOM event handler and wire into Angular's lifecycle with scope.$apply
                element.on('submit', function (event) {
                    scope.$apply(function () {
                        // on submit event, set submitted to true (like the previous trick)
                        form.$submitted = true;

                        // if form is valid, execute the submission handler function and reset form submission state
                        if (form.$valid) {
                            fn(scope, {$event: event});
                            form.$submitted = false;
                        }
                    });
                });
            }
        };
    }
]);

AppDirectives.directive('datetimez', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attrs, ngModelCtrl) {
            element.datetimepicker({
                dateFormat: 'dd/MM/yyyy hh:mm:ss',
                language: 'pt-EN'
            }).on('changeDate', function (e) {
                ngModelCtrl.$setViewValue(e.date);
                scope.$apply();
            });
        }
    };
});
AppDirectives.directive("ngcEatClick", function factory() {
    return function (scope, element, attrs) {
        element.click(function (e) {
            e.stopPropagation();
        });
    }
})