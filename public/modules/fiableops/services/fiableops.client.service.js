'use strict';

//Fiableops service used to communicate Fiableops REST endpoints
angular.module('fiableops').factory('Fiableops', ['$resource',
	function($resource) {
		return $resource('fiableops/:fiableopId', { fiableopId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);