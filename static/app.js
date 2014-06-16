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
		.when('/form', {
			templateUrl: 'partials/formTemplate.html',
			controller: 'FormCtrl'
		})
		.when('/srsbsns', {
			templateUrl: 'partials/srsbsns.html',
			controller: 'SrsCtrl'
		})
		/*
		.when('/createPromotion', {

		})
		.when('/editPromotion:promoID', {

		})
		*/		
		.otherwise({
			redirectTo: '/'
		})
	; // end routeprovider
});
