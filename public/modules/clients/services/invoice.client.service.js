'use strict';

//invoice service used to communicate clients REST endpoints
angular.module('clients').factory('Invoice', ['$resource',
	function($resource) {
		return $resource('clients/:clientId/proforma/:proformaId/Invoice/:InvoiceId', {}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);