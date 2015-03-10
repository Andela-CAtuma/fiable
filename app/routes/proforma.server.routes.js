'use strict';

module.exports = function(app) {
  var users = require('../../app/controllers/users');
  var clients = require('../../app/controllers/clients.server.controller.js');
  var proforma = require('../../app/controllers/proforma.server.controller.js');

  // clients Routes
  app.route('/proforma')
    .get(proforma.list)
    .post(users.requiresLogin, proforma.create);

  //list all proforma independent of client
  // app.route('client/proforma')
  //   .get(clients.clientProformaById, proforma.clientProforma);

  // list all proforma for each client
  app.route('client/:clientId/proforma')
    .get(proforma.clientProforma);

  app.route('client/:clientId/proforma/:proformaId')
    .get(proforma.read)
    .put(users.requiresLogin, proforma.hasAuthorization, proforma.update)
    .delete(users.requiresLogin, proforma.hasAuthorization, proforma.delete);

  // Finish by binding the client middleware
  app.param('clientId', clients.clientById);
  app.param('proformaId', proforma.proformaById);

};
