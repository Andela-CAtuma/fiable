// 'use strict';

// /**
//  * Module dependencies.
//  */
// var mongoose = require('mongoose'),
//   errorHandler = require('./errors'),
//   Client = mongoose.model('Client'),
//   Invoice = mongoose.model('Invoice'),
//   Pinvoice = mongoose.model('Pinvoice'),
//   Item = mongoose.model('Item'),

//   _ = require('lodash');

// /**
//  * Create a  invoice
//  */
// exports.createInvoice = function(req, res) {
//   var item = new Item(req.body);
//   item.user = req.user;
//   req.invoice.items.push(item);
//   req.invoice.save(function(err) {
//     if (err) {
//       return res.status(400).send({
//         message: errorHandler.getErrorMessage(err)
//       });
//     } else {

//       res.jsonp(req.invoice);
//     }
//   });
// };

// exports.createProforma = function(req, res) {
//   var item = new Item(req.body);
//   item.user = req.user;
//   req.proforma.items.push(item);
//   req.proforma.save(function(err) {
//     if (err) {
//       return res.status(400).send({
//         message: errorHandler.getErrorMessage(err)
//       });
//     } else {

//       res.jsonp(req.proforma);
//     }
//   });
// };

// /**
//  * Show the current invoice
//  */
// exports.read = function(req, res) {
//   res.jsonp(req.item);
// };

// /**
//  * Update a invoice
//  */
// exports.update = function(req, res) {
//   var item = req.item;

//   item = _.extend(item, req.body);

//   item.save(function(err) {
//     if (err) {
//       return res.status(400).send({
//         message: errorHandler.getErrorMessage(err)
//       });
//     } else {
//       res.jsonp(item);
//     }
//   });
// };

// /**
//  * Delete an invoice
//  */
// exports.delete = function(req, res) {
//   var item = req.item;

//   item.remove(function(err) {
//     if (err) {
//       return res.status(400).send({
//         message: errorHandler.getErrorMessage(err)
//       });
//     } else {
//       res.jsonp(item);
//     }
//   });
// };

// /**
//  * List of items in invoice or proforma
//  */
// exports.listInvoiceItems = function(req, res) {
//   Invoice.find({
//     user: req.user
//   }).sort('-created').populate('user', 'displayName').exec(function(err, invoices) {
//     if (err) {
//       return res.status(400).send({
//         message: errorHandler.getErrorMessage(err)
//       });
//     }
//     _.forEach(invoices, function(invoice, key){
//       console.log(invoice);
//     });
//     // res.jsonp(invoice);
//   });
// };

// exports.listProformaItems = function(req, res) {
//   Pinvoice.find({
//     user: req.user
//   }).sort('-created').populate('user', 'displayName').exec(function(err, proforma) {
//     if (err) {
//       return res.status(400).send({
//         message: errorHandler.getErrorMessage(err)
//       });
//     }
//     _.forEach(proforma, function(proformae, key){
//       console.log(proformae);
//     });
//       // res.jsonp(proforma);
//   });
// };

// /**
//  * invoice middlewares
//  */
// exports.itemById = function(req, res, next, id) {
//   Item.findById(id).populate('user', 'displayName').exec(function(err, item) {
//     if (err) return next(err);
//     if (!item) return next(new Error('Failed to load invoice ' + id));
//     req.item = item;
//     next();
//   });
// };

// exports.clientInvoiceItemById = function(req, res, next) {
//   Invoice.findById(req.params.invoiceId).populate('user', 'displayName').exec(function(err, invoice) {
//     if (err) return next(err);
//     if (!invoice) return next(new Error('Failed to load invoice '));
//     req.invoice = invoice;
//     next();
//   });
// };

// exports.clientProformaItemById = function(req, res, next) {
//   Pinvoice.findById(req.params.proformaId).populate('user', 'displayName').exec(function(err, proforma) {
//     if (err) return next(err);
//     if (!proforma)return next(new Error('Failed to load proforma '));
//     req.proforma = proforma;
//     next();
//   });
// };
// /**
//  * item authorization middleware
//  */
// exports.hasAuthorization = function(req, res, next) {
//   if (req.item.user.id !== req.user.id) {
//     return res.status(403).send('User is not authorized');
//   }
//   next();
// };
