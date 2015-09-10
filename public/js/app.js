
var app = angular.module('startup-locator', [
	'ui.router',
	'firebase'
]);

app.constant('FBURL', 'https://startup-locator.firebaseio.com/');

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