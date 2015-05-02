'use strict';

//delivery service used to communicate clients REST endpoints
angular.module('clients').factory('Delivery', ['$resource',
	function($resource) {
		return $resource('clients/:clientId/proforma/:proformaId/delivery/:deliveryId', {}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);