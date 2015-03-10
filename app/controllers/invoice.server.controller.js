'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  errorHandler = require('./errors'),
  client = mongoose.model('Client'),
  invoice = mongoose.model('Invoice'),

  _ = require('lodash');

/**
 * Create a  invoice
 */
exports.create = function(req, res) {
  var invoice = new invoice(req.body);
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
  invoice.find({
    user: req.user
  }).sort('-created').populate('user', 'displayName').exec(function(err, profroma) {
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
 * List client invoice
 */
exports.clientInvoice = function(req, res) {
  var clientId = req.client.id,
      invoices = [];
  invoice.find().sort('-created').populate('user', 'displayName').exec(function(err, invoices) {
    if(err){
      return res.status(400).send({message: 'No invoice found for client'});
    }
    // _.extend(invoices, function(invoice, key) {
    //   if (invoice.clientId === clientId){
    //     console.log(invoice);
    //     invoices.push(invoice);
    //   }
    //   res.json(invoices);
    // });
  });
};

/**
 * invoice middlewares
 */
exports.invoiceById = function(req, res, next, id) {
  invoice.findById(id).populate('user', 'displayName').exec(function(err, invoice) {
    if (err) return next(err);
    if (!invoice) return next(new Error('Failed to load invoice ' + id));
    req.invoice = invoice;
    next();
  });
};

exports.clientInvoiceById = function(req, res, next) {
  client.findById(req.params.clientId).populate('user', 'displayName').exec(function(err, client) {
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
