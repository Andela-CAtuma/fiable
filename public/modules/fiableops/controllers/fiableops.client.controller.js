'use strict';

// Fiableops controller
angular.module('fiableops').controller('FiableopsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Fiableops',
	function($scope, $stateParams, $location, Authentication, Fiableops ) {
		$scope.authentication = Authentication;

		// Create new Fiableop
		$scope.create = function() {
			// Create new Fiableop object
			var fiableop = new Fiableops ({
				name: this.name
			});

			// Redirect after save
			fiableop.$save(function(response) {
				$location.path('fiableops/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Fiableop
		$scope.remove = function( fiableop ) {
			if ( fiableop ) { fiableop.$remove();

				for (var i in $scope.fiableops ) {
					if ($scope.fiableops [i] === fiableop ) {
						$scope.fiableops.splice(i, 1);
					}
				}
			} else {
				$scope.fiableop.$remove(function() {
					$location.path('fiableops');
				});
			}
		};

		// Update existing Fiableop
		$scope.update = function() {
			var fiableop = $scope.fiableop ;

			fiableop.$update(function() {
				$location.path('fiableops/' + fiableop._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Fiableops
		$scope.find = function() {
			$scope.fiableops = Fiableops.query();
		};

		// Find existing Fiableop
		$scope.findOne = function() {
			$scope.fiableop = Fiableops.get({ 
				fiableopId: $stateParams.fiableopId
			});
		};
	}
]);