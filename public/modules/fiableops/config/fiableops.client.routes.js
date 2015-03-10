'use strict';

//Setting up route
angular.module('fiableops').config(['$stateProvider',
	function($stateProvider) {
		// Fiableops state routing
		$stateProvider.
		state('listFiableops', {
			url: '/fiableops',
			templateUrl: 'modules/fiableops/views/list-fiableops.client.view.html'
		}).
		state('createFiableop', {
			url: '/fiableops/create',
			templateUrl: 'modules/fiableops/views/create-fiableop.client.view.html'
		}).
		state('viewFiableop', {
			url: '/fiableops/:fiableopId',
			templateUrl: 'modules/fiableops/views/view-fiableop.client.view.html'
		}).
		state('editFiableop', {
			url: '/fiableops/:fiableopId/edit',
			templateUrl: 'modules/fiableops/views/edit-fiableop.client.view.html'
		});
	}
]);