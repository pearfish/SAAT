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
		.when('/view', {
			templateUrl: 'partials/viewTemplate.html',
			controller: 'ViewCtrl'
		})
		.when('/create', {
			templateUrl: 'partials/createTemplate.html',
			controller: 'CreateCtrl'
		})
		.when('/edit/:pid', {
			templateUrl: 'partials/editTemplate.html',
			controller: 'EditCtrl'
		})
		.otherwise({
			redirectTo: '/'
		})
	; // end routeprovider
})
.run( function (PromoService) {
	PromoService.syncPromos();	
});
