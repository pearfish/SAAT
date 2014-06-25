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
	.controller('GearCtrl', ['$scope', 'gearFactory', function(scope, gearFac){
		scope.selections = {
			helmet: '',
			shoulder: '',
			chest: '',
			pantaloons: '',
			hands: '',
			feets: ''
		}
		scope.stats = [
			{
				name:'power',
				value: 0
			},
			{
				name:'precision',
				value: 0
			},
			{
				name:'ferocity',
				value: 0
			},
			{
				name:'healing power',
				value: 0
			},
			{
				name:'toughness',
				value: 0
			},
			{
				name:'vitality',
				value: 0
			},
			{
				name:'condition damage',
				value: 0
			},
			{
				name:'boon duration',
				value: 0
			}
		];
		scope.setGear = function(slot, set) {
			$scope.selections[slot] = set;	
		};
		
		scope.slots = gearFac.getSlots();
		scope.sets = gearFac.getSets();
	}])
; // end module