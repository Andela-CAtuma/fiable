'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  errorHandler = require('./errors'),
  Client = mongoose.model('Client'),
  Invoice = mongoose.model('Invoice'),
  Pinvoice = mongoose.model('Pinvoice'),

  _ = require('lodash');

/**
 * Create a  invoice
 */
 exports.create = function(req, res) {
  var invoice = new Invoice(req.body);
    invoice.user = req.user;
    invoice.client = req.client;
    invoice.proforma = req.proforma;
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

exports.clientProformaInvoiceById = function(req, res, next) {
    Pinvoice.findById(req.params.proformaId).populate('user', 'displayName').exec(function(err, proforma) {
      if (err) return next(err);
      if (!proforma) return next(new Error('Failed to load invoice '));
      req.proforma = proforma;
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
