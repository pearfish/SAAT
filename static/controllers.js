angular.module('SAATapp')
	.controller('ViewCtrl', ['$scope', 'PromoService', function($scope, PromoService) {
		$scope.getPromoData = function() {
			$scope.promos = PromoService.getPromos();
		}
		$scope.getSpecificPromoData = function(queryI) {
			$scope.promos = PromoService.getPromos();
		}
	}])
	.controller('CreateCtrl', ['$scope', 'PromoService', function($scope, PromoService) {
		$scope.submitForm = function(isValid) {
			if (isValid) {
				PromoService.addPromo("PLACEHOLDER");
			} else {
				alert('woah no ways, form is invalid');
				console.log($scope.promoForm);
			}
		};
		
	}]) // end FormCtrl
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