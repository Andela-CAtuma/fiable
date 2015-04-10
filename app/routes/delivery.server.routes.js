
'use strict';

module.exports = function(app) {
  var users = require('../../app/controllers/users');
  var clients = require('../../app/controllers/clients.server.controller.js');
  var delivery = require('../../app/controllers/delivery.server.controller.js');
  var proforma = require('../../app/controllers/proforma.server.controller.js');
  // delivery Routes

  // list all delivery for each client
  app.route('/clients/:clientId/proforma/:proformaId/delivery')
    .get(delivery.list)
    .post(users.requiresLogin, delivery.create);
    // .post(delivery.create);

  app.route('/clients/:clientId/proforma/:proformaId/delivery/:deliveryId')
    .get(delivery.read)
    .put(users.requiresLogin, delivery.hasAuthorization, delivery.update)
    // .put(delivery.update)
    .delete(users.requiresLogin, delivery.hasAuthorization, delivery.delete);

  // Finish by binding the delivery middleware
  app.param('clientId', clients.clientById);
  app.param('deliveryId', delivery.deliveryById);
  app.param('proformaId', proforma.proformaById);

};
