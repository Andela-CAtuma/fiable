'use strict';

module.exports = function(app) {
  var users = require('../../app/controllers/users');
  var clients = require('../../app/controllers/clients.server.controller.js');
  var invoice = require('../../app/controllers/invoice.server.controller.js');

  // clients Routes
  app.route('/invoice')
    .get(invoice.list)
    .post(users.requiresLogin, invoice.create);

  //list all invoice independent of client
  // app.route('client/invoice')
  //   .get(clients.clientInvoiceById, invoice.clientProforma);

  // list all invoice for each client
  app.route('client/:clientId/invoice')
    .get(invoice.clientInvoice);

  app.route('client/:clientId/invoice/:invoiceId')
    .get(invoice.read)
    .put(users.requiresLogin, invoice.hasAuthorization, invoice.update)
    .delete(users.requiresLogin, invoice.hasAuthorization, invoice.delete);

  // Finish by binding the client middleware
  app.param('clientId', clients.clientById);
  app.param('invoiceId', invoice.invoiceById);

};
