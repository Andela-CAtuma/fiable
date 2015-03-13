'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  errorHandler = require('./errors'),
  Client = mongoose.model('Client'),
  Invoice = mongoose.model('Invoice'),
  Item = mongoose.model('Item'),

  _ = require('lodash');

/**
 * Create a  invoice
 */
exports.create = function(req, res) {
  var invoice = new Invoice(req.body);
  invoice.user = req.user;
  invoice.client = req.client;
  invoice.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {

      res.jsonp(invoice);
    }
  });
};

/**
 * Show the current invoice
 */
exports.read = function(req, res) {
  res.jsonp(req.invoice);
};

/**
 * Update a invoice
 */
exports.update = function(req, res) {
  var invoice = req.invoice;

  invoice = _.extend(invoice, req.body);

  invoice.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(invoice);
    }
  });
};

/**
 * Delete an invoice
 */
exports.delete = function(req, res) {
  var invoice = req.invoice;

  invoice.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(invoice);
    }
  });
};

/**
 * List of invoice
 */
exports.list = function(req, res) {
  Invoice.find({
    user: req.user
  }).sort('-created').populate('user', 'displayName').exec(function(err, invoices) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(invoices);
    }
  });
};

/**
 * List client invoice
 */
exports.clientInvoice = function(req, res) {
  console.log(req.client);
  var clientId = req.client.id,
      invoices = [];
  // Invoice.find().sort('-created').populate('user', 'displayName').exec(function(err, invoices) {
  //   if(err){
  //     return res.status(400).send({message: 'No invoice found for client'});
  //   }
  //   // _.extend(invoices, function(invoice, key) {
  //   //   if (invoice.clientId === clientId){
  //   //     console.log(invoice);
  //   //     invoices.push(invoice);
  //   //   }
  //   //   res.json(invoices);
  //   // });
  // });
};

/**
 * invoice middlewares
 */
exports.invoiceById = function(req, res, next, id) {
  Invoice.findById(id).populate('user', 'displayName').exec(function(err, invoice) {
    if (err) return next(err);
    if (!invoice) return next(new Error('Failed to load invoice ' + id));
    req.invoice = invoice;
    next();
  });
};

exports.clientInvoiceById = function(req, res, next) {
  Client.findById(req.params.clientId).populate('user', 'displayName').exec(function(err, client) {
    if (err) return next(err);
    if (!client) return next(new Error('Failed to load invoice '));
    req.client = client;
    next();
  });
};
/**
 * invoice authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
  if (req.invoice.user.id !== req.user.id) {
    return res.status(403).send('User is not authorized');
  }
  next();
};
