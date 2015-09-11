
var app = angular.module('startup-locator', [
	'ui.router',
	'angularSpinner'
]);

app.config(function($stateProvider, $urlRouterProvider){
	$stateProvider
		.state('home', {
			url: "/",
			templateUrl: "templates/main.html",
			controller: 'MainCtrl'
		})
		.state('startups', {
			url: "/startups",
			templateUrl: "templates/startups.html",
			controller: 'StartupsCtrl'
		});

	$urlRouterProvider.otherwise("/");
});


app.directive('scrolledtobottom', function ($scope) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var raw = element[0];
            console.log('loading directive');
                
            element.bind('scroll', function () {
                if (raw.scrollTop + raw.offsetHeight === raw.scrollHeight) {
                    console.log("I am at the bottom");
                    
                    console.log(scope);
                    $scope.loadMoreStartups();
                }
            });
        }
    };
});
