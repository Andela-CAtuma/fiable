'use strict';

angular.module('clients')
.controller('InvoiceController', ['$scope', '$stateParams', '$location', 'Authentication', 'Clients', 'Proforma', 'Invoice','Delivery',  function ($scope, $stateParams, $location, Authentication, Clients, Proforma, Invoice, Delivery) {
	$scope.authentication = Authentication;
	$scope.totalPrices = [];
	$scope.toggle = true;
	var clientId = $stateParams.clientId;
	var invoiceId = $stateParams.invoiceId;
		
// Create new invoice

	$scope.addRow = function(totalPrices) {
		$scope.unitTotal = $scope.unitPrice * $scope.qtes;	
		$scope.totalPrices.push($scope.unitTotal);
		console.log($scope.totalPrices);
		$scope.receipts.push({ 'description':$scope.description, 'qtes': $scope.qtes, 'unitPrice':$scope.unitPrice, 'unitTotal': $scope.unitTotal});
	 	console.log('receipts', $scope.receipts);
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
	 $scope.receipts = [];

	};

	$scope.createDelivery = function() {
   
		var delivery = new Delivery ($scope.delivery);
	 		console.log('delivery', delivery);

		// Redirect after save
		delivery.$save({clientId: $stateParams.clientId, 
			proformaId: $stateParams.proformaId}, function(response) {
			$location.path('clients/' + proforma.client + '/proforma/' + proforma._id + '/delivery/' + delivery._id);
			console.log(response);
			// Clear form fields
			$scope.delivery = '';
		}, function(errorResponse) {
			$scope.error = errorResponse.data.message;
		});
	};

	$scope.create = function() {
   
		var invoice = new Invoice ($scope.invoice);
			// invoice.receipts = $scope.receipts;
			// invoice.total = $scope.total;
	 		console.log('invoice', invoice);

		// Redirect after save
		invoice.$save({clientId: $stateParams.clientId, 
			proformaId: $stateParams.proformaId}, function(response) {
			$location.path('clients/' + proforma.client + '/proforma/' + proforma._id + '/invoice/' + invoice._id);
			console.log(response);
			// Clear form fields
			$scope.invoice = '';
		}, function(errorResponse) {
			$scope.error = errorResponse.data.message;
		});
	};

	// Remove existing invoice
	$scope.remove = function( invoice ) {
		if ( invoice ) { invoice.$remove();

			for (var i in $scope.invoice ) {
				if ($scope.invoice [i] === invoice ) {
					$scope.invoice.splice(i, 1);
				}
			}
		} else {
			$scope.invoice.$remove(function() {
				// $location.path('invoice');
			});
		}
	};

	// Update existing invoice
	$scope.update = function() {
		var invoice = $scope.invoice ;
		invoice.$update(function() {
			// $location.path('invoice/' + invoice._id);
		}, function(errorResponse) {
			$scope.error = errorResponse.data.message;
		});
	};

	// Find a list of invoice
	$scope.find = function() {
		$scope.invoices = Invoice.query({clientId: $stateParams.clientId,
			proformaId: $stateParams.proformaId}); 
		console.log('invoice', $scope.invoices);
	};

	// Find a list of deliveries
	$scope.findDelivery = function() {
		$scope.deliveries = Delivery.query({clientId: $stateParams.clientId,
			proformaId: $stateParams.proformaId}); 
		console.log('deliveries', $scope.deliveries);
	};

	// Find existing invoice
	$scope.findOne = function() {
		$scope.proforma = Proforma.get({clientId: $stateParams.clientId,
			proformaId: $stateParams.proformaId}); 
		console.log('proforma', $scope.proforma);

		$scope.invoices = Invoice.query({clientId: $stateParams.clientId,
			proformaId: $stateParams.proformaId,
			invoiceId: $stateParams.invoiceId}); 
		console.log('invoice', $scope.invoices);
	};

	// Find existing invoice
	$scope.findOneDelivery = function() {
		$scope.client = Clients.get({clientId: $stateParams.clientId});
		console.log('client', $scope.client);
		
		$scope.proforma = Proforma.get({clientId: $stateParams.clientId,
			proformaId: $stateParams.proformaId}); 
		console.log('proforma', $scope.proforma);

		$scope.delivery = Delivery.query({clientId: $stateParams.clientId,
			proformaId: $stateParams.proformaId,
			deliveryId: $stateParams.deliveryId}); 
		console.log('delivery', $scope.delivery);
	};

	$scope.toggler = function() {
		$scope.toggle = false;
		$scope.btnToggler = true;
	};
}
]);