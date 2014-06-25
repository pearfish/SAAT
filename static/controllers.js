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
		$scope.selections = {
			helmet: '',
			shoulder: '',
			chest: '',
			pantaloons: '',
			hands: '',
			feets: ''
		}
		$scope.setGear = function(slot, set) {
			$scope.selections[slot] = set;	
		};
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
				name: 'feets',
				major: 34,
				minor: 24,
				celestial: 15
			}
		];
		$scope.sets = [
			{
				name: 'Berserker',
				major:  'power',
				minor1: 'precision',
				minor2: 'ferocity'
			},
			{
				name: 'Zealot',
				major:  'power',
				minor1: 'precision',
				minor2: 'healing power'
			},
			{
				name: 'Soldier',
				major:  'power',
				minor1: 'toughness',
				minor2: 'vitality'
			},
			{
				name: 'Valkyrie',
				major:  'power',
				minor1: 'vitality',
				minor2: 'ferocity'
			},			
			{
				name: 'Assassin',
				major:  'precision',
				minor1: 'power',
				minor2: 'ferocity'
			},			
			{
				name: 'Rampager',
				major:  'precision',
				minor1: 'power',
				minor2: 'condition damage'
			},
			{
				name: 'Knight',
				major:  'toughness',
				minor1: 'power',
				minor2: 'precision'
			},
			{
				name: 'Cavalier',
				major:  'toughness',
				minor1: 'power',
				minor2: 'ferocity'
			},
			{
				name: 'Settler',
				major:  'toughness',
				minor1: 'condition damage',
				minor2: 'healing power'
			},
			{
				name: 'Giver',
				major:  'toughness',
				minor1: 'boon duration',
				minor2: 'healing power'
			},
			{
				name: 'Sentinel',
				major:  'vitality',
				minor1: 'power',
				minor2: 'toughness'
			},
			{
				name: 'Shaman',
				major:  'vitality',
				minor1: 'condition damage',
				minor2: 'healing power'
			},
			{
				name: 'Carrion',
				major:  'condition damage',
				minor1: 'power',
				minor2: 'vitality'
			},
			{
				name: 'Rabid',
				major:  'condition damage',
				minor1: 'precision',
				minor2: 'toughness'
			},
			{
				name: 'Dire',
				major:  'condition damage',
				minor1: 'toughness',
				minor2: 'vitality'
			},
			{
				name: 'Cleric',
				major:  'healing power',
				minor1: 'power',
				minor2: 'toughness'
			},
			{
				name: 'Magi',
				major:  'healing power',
				minor1: 'precision',
				minor2: 'vitality'
			},
			{
				name: 'Apothecary',
				major:  'healing power',
				minor1: 'toughness',
				minor2: 'condition damage'
			}
		];
			
	})
; // end module