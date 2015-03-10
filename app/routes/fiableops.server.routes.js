'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var fiableops = require('../../app/controllers/fiableops');

	// Fiableops Routes
	app.route('/fiableops')
		.get(fiableops.list)
		.post(users.requiresLogin, fiableops.create);

	app.route('/fiableops/:fiableopId')
		.get(fiableops.read)
		.put(users.requiresLogin, fiableops.hasAuthorization, fiableops.update)
		.delete(users.requiresLogin, fiableops.hasAuthorization, fiableops.delete);

	// Finish by binding the Fiableop middleware
	app.param('fiableopId', fiableops.fiableopByID);
};