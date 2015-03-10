'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  errorHandler = require('./errors'),
  client = mongoose.model('Client'),
  proforma = mongoose.model('Pinvoice'),

  _ = require('lodash');

/**
 * Create a  proforma
 */
exports.create = function(req, res) {
  var proforma = new proforma(req.body);
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
  proforma.find({
    user: req.user
  }).sort('-created').populate('user', 'displayName').exec(function(err, profroma) {
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
  var clientId = req.client.id,
      proformas = [];
  proforma.find().sort('-created').populate('user', 'displayName').exec(function(err, proformas) {
    if(err){
      return res.status(400).send({message: 'No proforma found for client'});
    }
    // _.extend(proformas, function(proforma, key) {
    //   if (proforma.clientId === clientId){
    //     console.log(proforma);
    //     proformas.push(proforma);
    //   }
    //   res.json(proformas);
    // });
  });
};

/**
 * proforma middlewares
 */
exports.proformaById = function(req, res, next, id) {
  proforma.findById(id).populate('user', 'displayName').exec(function(err, proforma) {
    if (err) return next(err);
    if (!proforma) return next(new Error('Failed to load proforma ' + id));
    req.proforma = proforma;
    next();
  });
};

exports.clientProformaById = function(req, res, next) {
  client.findById(req.params.clientId).populate('user', 'displayName').exec(function(err, client) {
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
