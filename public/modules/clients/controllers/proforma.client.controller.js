'use strict';

angular.module('clients')
.controller('ProformaController', ['$scope', '$stateParams', '$location', 'Authentication', 'Clients', 'Proforma', function ($scope, $stateParams, $location, Authentication, Clients, Proforma) {
	$scope.authentication = Authentication;
	$scope.totalPrices = [];
	$scope.toggle = true;
		
// Create new proforma

	$scope.addRow = function(totalPrices) {
		$scope.unitTotal = 0;
		$scope.unitTotal = $scope.unitPrice * $scope.qtes;	
		$scope.totalPrices.push($scope.unitTotal);
		console.log($scope.totalPrices);
		$scope.quotations.push({ 'description':$scope.description, 'qtes': $scope.qtes, 'unitPrice':$scope.unitPrice, 'unitTotal': $scope.unitTotal});
	 	console.log('quotations', $scope.quotations);
		$scope.description ='';
		$scope.qtes ='';
		$scope.unitPrice ='';
		$scope.calcTotal();
	};

	$scope.calcTotal = function(totalPrices) {
		$scope.total = 0 ;
		var totals = $scope.totalPrices ; 
		console.log('bagg', totals);
		angular.forEach(totals, function(total, key) {
		$scope.total += totals[key];
        });

	};

	$scope.editable = function() {
	 $scope.quotations = [];

	};

	$scope.create = function() {
   
		var clientId = $stateParams.clientId;
		
		// Create new Fiableop object
		var proforma = new Proforma ($scope.proforma);
			proforma.quotations = $scope.quotations;
			proforma.total = $scope.total;
	 		console.log('proforma', proforma);

		// Redirect after save
		proforma.$save({clientId: $stateParams.clientId},function(response) {
			$location.path('clients/' + $stateParams.clientId + '/proforma');
			console.log(response);
			// Clear form fields
			$scope.proforma = '';
		}, function(errorResponse) {
			$scope.error = errorResponse.data.message;
		});
	};

	// Remove existing Proforma
	$scope.remove = function( proforma ) {
		if ( proforma ) { Proforma.$remove();

			for (var i in $scope.Proforma ) {
				if ($scope.proforma [i] === proforma ) {
					$scope.proforma.splice(i, 1);
				}
			}
		} else {
			$scope.proforma.$remove(function() {
				// $location.path('proforma');
			});
		}
	};

	// Update existing Proforma
	$scope.update = function() {
		var proforma = $scope.proforma ;
		Proforma.$update(function() {
			// $location.path('proforma/' + proforma._id);
		}, function(errorResponse) {
			$scope.error = errorResponse.data.message;
		});
	};

	// Find a list of Proforma
	$scope.find = function() {
		$scope.proforma = Proforma.query({clientId: $stateParams.clientId});
		console.log('list', $scope.proforma);
	};

	// Find existing Proforma
	$scope.findOne = function() {
		$scope.proforma = Proforma.get({ 
			clientId: $stateParams.clientId,
			proformaId: $stateParams.proformaId
		});
		$scope.client = Clients.get({clientId: $stateParams.clientId});
		console.log('item', $scope.proforma);

	};

	$scope.toggler = function() {
		$scope.toggle = false;
		$scope.btnToggler = true;
	};
}
]);