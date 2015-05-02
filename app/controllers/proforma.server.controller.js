'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  errorHandler = require('./errors'),
  Client = mongoose.model('Client'),
  Pinvoice = mongoose.model('Pinvoice'),

  _ = require('lodash');

/**
 * Create a  proforma
 */
exports.create = function(req, res) {
  var proforma = new Pinvoice(req.body);
  proforma.user = req.user;
  proforma.client = req.client;

  proforma.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {

      res.jsonp(proforma);
    }
  });
};

/**
 * Show the current proforma
 */
exports.read = function(req, res) {
  res.jsonp(req.proforma);
};

/**
 * Update a proforma
 */
exports.update = function(req, res) {
  var proforma = req.proforma;

  proforma = _.extend(proforma, req.body);

  proforma.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(proforma);
    }
  });
};

/**
 * Delete an proforma
 */
exports.delete = function(req, res) {
  var proforma = req.proforma;

  proforma.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(proforma);
    }
  });
};

/**
 * List of proforma
 */
exports.list = function(req, res) {
  Pinvoice.find({
    user: req.user
  }).sort('-created').populate('user', 'displayName').exec(function(err, proforma) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(proforma);
    }
  });
};

/**
 * List client proforma
 */
exports.clientProforma = function(req, res) {
  console.log('client', req.client.id);
  var clientId = req.client.id,
    proformae = [];
  Pinvoice.find().sort('-created').populate('user', 'displayName').exec(function(err, proformas) {
        console.log('proformax', proformas);
    if (err) {
      return res.status(400).send({
        message: 'No proforma found for client'
      });
    }
    _.forEach(proformas, function(proforma, key) {
      console.log('proforma', proforma);
      if (proforma.client.toString() === clientId.toString()) {
        console.log('proformas', proforma);
        proformae.push(proforma);
        console.log('proformae', proformae);
      }
    });
      res.json(proformae);
  });
};

/**
 * proforma middlewares
 */

 exports.uniqueProformaName = function(req, res, next){
   var proformaNo = req.body.quotationNo;
   Pinvoice.find().exec(function(err, proforma){
    console.log('proforma', proforma);
    _.forEach(proforma, function(proformae, key){
      if(proformaNo === proformae.quotationNo){
        console.log('error');
          return res.status(403).send({
            message: 'proforma Name Exist'
          });
      }
    });
   });
   next();

 };

exports.proformaById = function(req, res, next, id) {
  Pinvoice.findById(req.params.proformaId).populate('user', 'displayName').exec(function(err, proforma) {
    if (err) return next(err);
    if (!proforma) return next(new Error('Failed to load proforma ' + id));
    req.proforma = proforma;
    next();
  });
};

exports.clientProformaById = function(req, res, next) {
  Client.findById(req.params.clientId).populate('user', 'displayName').exec(function(err, client) {
    if (err) return next(err);
    if (!client) return next(new Error('Failed to load proforma '));
    req.client = client;
    next();
  });
};
/**
 * proforma authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
  if (req.proforma.user.id !== req.user.id) {
    return res.status(403).send('User is not authorized');
  }
  next();
};
