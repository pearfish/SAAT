angular.module('SAATapp', [
	'ngRoute',
	'ui.bootstrap'
])
.config(function ($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'partials/main.html'
			//main is boring, has no controller
		})
		.when('/boring', {
			templateUrl: 'partials/boringTemplate.html',
			controller: 'BoringCtrl'
		})
		.when('/create', {
			templateUrl: 'partials/createTemplate.html',
			controller: 'CreateCtrl'
		})
		.when('/edit:pid', {
			templateUrl: 'partials/editTemplate.html',
			controller: 'EditCtrl'
		})
		.otherwise({
			redirectTo: '/'
		})
	; // end routeprovider
});
