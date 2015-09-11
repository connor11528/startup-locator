
var app = angular.module('startup-locator', [
	'ui.router',
	'angularSpinner',
	'angular-storage'
]);

app.config(function($stateProvider, $urlRouterProvider){
	$stateProvider
		.state('home', {
			url: "/",
			templateUrl: "templates/main.html",
		})
		.state('startups', {
			url: "/startups",
			templateUrl: "templates/startups.html",
			controller: 'StartupsCtrl'
		});

	$urlRouterProvider.otherwise("/");
});


app.directive('scrolledtobottom', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var raw = element[0];
                
            element.bind('scroll', function () {
                if (raw.scrollTop + raw.offsetHeight === raw.scrollHeight) {                    
                    scope.loadingMore = true;
                    scope.loadMoreStartups();
                }
            });
        }
    };
});