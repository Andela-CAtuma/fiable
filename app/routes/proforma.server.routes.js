'use strict';

module.exports = function(app) {
  var users = require('../../app/controllers/users');
  var clients = require('../../app/controllers/clients.server.controller.js');
  var proforma = require('../../app/controllers/proforma.server.controller.js');
  var item = require('../../app/controllers/items.server.controller.js');

  // clients Routes
  // list all proforma irrespective of clients
  app.route('/proforma')
    .get(proforma.list);

  // list all proforma for each client
  app.route('/clients/:clientId/proforma')
    .get(proforma.clientProforma)
    // .post(users.requiresLogin, proforma.create);
    .post(proforma.create);

  app.route('/clients/:clientId/proforma/:proformaId')
    .get(proforma.read)
    .put(users.requiresLogin, proforma.hasAuthorization, proforma.update)
    .delete(users.requiresLogin, proforma.hasAuthorization, proforma.delete);

  app.route('/clients/:clientId/proforma/:proformaId/item')
    .get(item.listProformaItems)
    .post(item.createProforma);
  // Finish by binding the client middleware
  app.param('clientId', clients.clientById);
  app.param('proformaId', proforma.proformaById);

};
