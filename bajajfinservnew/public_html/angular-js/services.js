'use strict';

/// Initialize the services module
angular.module('bajajfinserv.services', [])
/// Services below
.factory('windowdialog', function($window){
	return {
		action: function(url, callback) {
			var basic_window = $window.open(url, "Window", "width=500,height=500")
			var window_watch = $window.setInterval(function() {
				if (basic_window.closed){
					if (callback)
						callback();
					$window.clearInterval(window_watch);
				}
			}, 500);
		}
	}
});
