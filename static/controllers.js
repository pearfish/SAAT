angular.module('SAATapp')
	.controller('ViewCtrl', ['$scope', 'PromoService', function($scope, PromoService) {
		$scope.getPromoData = function() {
			$scope.promos = PromoService.getPromos();
		}
		$scope.getSpecificPromoData = function(queryI) {
			$scope.promos = PromoService.getPromos();
		}
	}])
	.controller('CreateCtrl', function($scope, $http) {
		var message = "quack";
		$scope.message = message;
		
		$scope.submitNewPromo = function(){
			var datas = { name: "aName", desc: "aDesc" }; // ...replace this with actually grabbing info from DOM
			$http({ method: 'POST', url: '/newPromo', data: datas}) 
				.success( function(data, status, headers, config) {
					//success!
				})
				.error( function(data, status, headers, config) {
					alert('Woah! submitNewPromo failed!');
					console.log(data, status);
				})
			; // end http
		};

		// function to submit the form after all validation has occurred			
		$scope.submitForm = function(isValid) {
			// check to make sure the form is completely valid
			if (isValid) {
				alert('form is valid');
			} else {
				alert('woah no ways, form is invalid');
			}
		};
		
	}) // end FormCtrl
	.controller('EditCtrl', ['$scope', '$routeParams', 'PromoService', function($scope, $routeParams, PromoService) {
		var promoData = PromoService.getPromoById($routeParams.pid);
		if ( promoData === false ) {
			alert('there is no program with this ID');
		}
		$scope.old ={
			name : promoData.name, 
			id : promoData.pid
		}
		$scope.promoData = promoData;
		
		$scope.submitForm = function(isValid) {
			if (isValid) {
				//code
			}
		}
		
	}])
	
; // end module


/*
example alternate markup
var ctrl = [ '$scope', 'Book', function( scope, Book ) {
	scope.$on( 'books.update', function( event ) {
		scope.books = Book.books;
	});
	scope.books = Book.books;
}];
 
module.controller( "books.list", ctrl );
*/