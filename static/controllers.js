angular.module('SAATapp')
	.controller('ViewCtrl', ['$scope', 'PromoService', function($scope, PromoService) {
		$scope.promos = PromoService.getPromos();
		$scope.getPromoData = function() {
			PromoService.syncPromos();
			$scope.promos = PromoService.getPromos();
		}
		$scope.getSpecificPromoData = function(queryI) {
			$scope.promos = PromoService.getPromos();
		}
	}])
	.controller('CreateCtrl', ['$scope', 'PromoService', function($scope, PromoService) {
		$scope.submitForm = function(isValid) {
			if (isValid) {
				console.log($scope.promoData);
				PromoService.addPromo($scope.promoData);
			} else {
				alert('woah no ways, form is invalid');
				console.log($scope.promoForm);
			}
		};
		
	}]) // end FormCtrl
	.controller('EditCtrl', ['$scope', '$routeParams', 'PromoService', function($scope, $routeParams, PromoService) {
		var promoData = PromoService.getPromoById($routeParams.pid);
		if ( promoData === false ) {
			alert('there is no program with this ID, quit messing with the url');
		}
		$scope.promoData = promoData;
		
		$scope.old = { // just doing this to hang on to name/id for subheader
			name : promoData.name, 
			id : promoData.pid
		} 
		
		$scope.submitForm = function(isValid) {
			if (isValid) {
				PromoService.editPromo(promoData);
			}
		}
	}])
	.controller('GearCtrl', function($scope){
		$scope.slots = [
			//all given exotic stats
			{
				name: 'helmet',
				major: 45,
				minor: 32,
				celestial: 20
			},
			{
				name: 'shoulder',
				major: 34,
				minor: 24,
				celestial: 15
			},
			{
				name: 'chest',
				major: 101,
				minor: 72,
				celestial: 45
			},
			{
				name: 'pantaloons',
				major: 67,
				minor: 48,
				celestial: 30
			},
			{
				name: 'hands',
				major: 34,
				minor: 24,
				celestial: 15
			},
			{
				name: 'foot decorations',
				major: 34,
				minor: 24,
				celestial: 15
			}
		]
			
	})
; // end module