'use strict';

angular.module('clients').controller('ProformaController', ['$scope', '$stateParams', '$location', 'Authentication', 'Clients', 'Proforma',  function ($scope, $stateParams, $location, Authentication, Clients, Proforma) {
	$scope.authentication = Authentication;
	$scope.Proforma = '';
		
// Create new clients
	$scope.create = function() {
		
		// Create new Fiableop object
		var Proforma = new Proforma ({
			name: this.client.name,
			address: this.client.address,
			location: this.client.location
		});

		// Redirect after save
		Proforma.$save(function(response) {
			$location.path('Proforma/' + response._id);

			// Clear form fields
			$scope.Proforma = '';
		}, function(errorResponse) {
			$scope.error = errorResponse.data.message;
		});
	};

	// Remove existing Proforma
	$scope.remove = function( Proforma ) {
		if ( Proforma ) { Proforma.$remove();

			for (var i in $scope.Proforma ) {
				if ($scope.Proforma [i] === Proforma ) {
					$scope.Proforma.splice(i, 1);
				}
			}
		} else {
			$scope.Proforma.$remove(function() {
				$location.path('Proforma');
			});
		}
	};

	// Update existing Proforma
	$scope.update = function() {
		var Proforma = $scope.Proforma ;

		Proforma.$update(function() {
			$location.path('Proforma/' + Proforma._id);
		}, function(errorResponse) {
			$scope.error = errorResponse.data.message;
		});
	};

	// Find a list of Proforma
	$scope.find = function() {
		$scope.Proforma = Proforma.query();
	};

	// Find existing Proforma
	$scope.findOne = function() {
		$scope.Proforma = Proforma.get({ 
			clientId: $stateParams.clientId
		});
	};
	}
]);