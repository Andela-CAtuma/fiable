
'use strict';

module.exports = function(app) {
  var users = require('../../app/controllers/users');
  var clients = require('../../app/controllers/clients.server.controller.js');
  var invoice = require('../../app/controllers/invoice.server.controller.js');
  var proforma = require('../../app/controllers/proforma.server.controller.js');
  // clients Routes

  // list all invoice for each client
  app.route('/clients/:clientId/proforma/:proformaId/invoice')
    .get(invoice.list)
    .post(users.requiresLogin, invoice.create);
    // .post(invoice.create);

  app.route('/clients/:clientId/proforma/:proformaId/invoice/:invoiceId')
    .get(invoice.read)
    // .put(users.requiresLogin, invoice.hasAuthorization, invoice.update)
    .put(invoice.update)
    .delete(users.requiresLogin, invoice.hasAuthorization, invoice.delete);

  // Finish by binding the client middleware
  app.param('clientId', clients.clientById);
  app.param('invoiceId', invoice.invoiceById);
  app.param('proformaId', proforma.proformaById);

};
