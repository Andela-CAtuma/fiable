'use strict';

module.exports = function(app) {
 var users = require('../../app/controllers/users');
 var clients = require('../../app/controllers/clients.server.controller.js');

 // clients Routes
 app.route('/clients')
   .get(clients.list)
   .post(users.requiresLogin, clients.uniqueClientName, clients.create);
   // .post(clients.create);

 app.route('/clients/:clientId')
   .get(clients.read)
   .put(users.requiresLogin, clients.hasAuthorization, clients.update)
   .delete(users.requiresLogin, clients.hasAuthorization, clients.delete);

 // Finish by binding the client middleware
 app.param('clientId', clients.clientById);
};
