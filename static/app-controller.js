angular.module('SAATapp')
	.controller('BoringCtrl', function($scope, $http) {

		$scope.duck = function() {
			alert("quack");
		}
		$scope.getPromoData = function() {
			$http({ method: 'GET', url: '/promos'}) 
				.success( function(data, status, headers, config) {
					$scope.promos = data;
				})
				.error( function(data, status, headers, config) {
					alert('Woah! getPromoData failed!');
					console.log(data, status);
				})
			; // end http
		}
		$scope.getSpecificPromoData = function() {
			$http({ method: 'GET', url: '/specificPromos?mid='+$scope.mid}) 
				.success( function(data, status, headers, config) {
					$scope.promos = data;
				})
				.error( function(data, status, headers, config) {
					alert('Woah! getPromoData failed!');
					console.log(data, status);
				})
			; // end http
		}
	})
	.controller('FormCtrl', function($scope, $http) {
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
	.controller('SrsCtrl', function($scope) {
	})
	
; // end module
