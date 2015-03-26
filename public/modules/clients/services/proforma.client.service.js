'use strict';

//clients service used to communicate clients REST endpoints
angular.module('clients').factory('Proforma', ['$resource',
	function($resource) {
		return $resource('clients/:clientId/proforma/:proformaId', { proformaId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);