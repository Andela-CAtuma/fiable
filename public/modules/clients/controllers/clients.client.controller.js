'use strict';

angular.module('clients').controller('ClientsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Clients', function ($scope, $stateParams, $location, Authentication, Clients) {
	$scope.authentication = Authentication;
	$scope.client = '';
	$scope.toggle = true;
	
		
// Create new clients
	$scope.create = function() {
		
		// Create new Fiableop object
		var clients = new Clients ({
			name: this.client.name,
			address: this.client.address,
			location: this.client.location
		});

		// Redirect after save
		clients.$save(function(response) {
			$location.path('clients/' + response._id);

			// Clear form fields
			$scope.client = '';
		}, function(errorResponse) {
			$scope.error = errorResponse.data.message;
		});
	};

	// Remove existing clients
	$scope.remove = function( clients ) {
		if ( clients ) { clients.$remove();

			for (var i in $scope.clients ) {
				if ($scope.clients [i] === clients ) {
					$scope.clients.splice(i, 1);
				}
			}
		} else {
			$scope.clients.$remove(function() {
				$location.path('clients');
			});
		}
	};

	// Update existing clients
	$scope.update = function() {
		var clients = $scope.clients ;

		clients.$update(function() {
			$location.path('clients/' + clients._id);
		}, function(errorResponse) {
			$scope.error = errorResponse.data.message;
		});
	};

	// Find a list of clients
	$scope.find = function() {
		$scope.clients = Clients.query();
	};

	// Find existing clients
	$scope.findOne = function() {
		$scope.clients = Clients.get({ 
			clientId: $stateParams.clientId
		});
	};

	$scope.toggler = function(){
		$scope.toggle = false;
		$scope.btnToggler = true;
	};
	}
]);