'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  errorHandler = require('./errors'),
  Client = mongoose.model('Client'),
  _ = require('lodash');

/**
 * Create a client
 */
exports.create = function(req, res) {
  console.log(req.body);
  var client = new Client(req.body);
  client.user = req.user;
  console.log('client', client);

  client.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(client);
    }
  });
};

/**
 * Show the current client
 */
exports.read = function(req, res) {
  res.jsonp(req.client);
};

/**
 * Update a client
 */
exports.update = function(req, res) {
  var client = req.client;

  client = _.extend(client, req.body);

  client.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(client);
    }
  });
};

/**
 * Delete an client
 */
exports.delete = function(req, res) {
  var client = req.client;

  client.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(client);
    }
  });
};

/**
 * List of clients
 */
exports.list = function(req, res) {
  Client.find({user: req.user}).sort('-created').populate('user', 'displayName').exec(function(err, clients) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(clients);
    }
  });
};


/**
 * client middleware
 */

exports.clientById = function(req, res, next, id) {
  console.log('welcome here');
  Client.findById(id).populate('user', 'displayName').exec(function(err, client) {
    if (err) return next(err);
    if (!client) return next(new Error('Failed to load client ' + id));
    req.client = client;
    next();
  });
};


/**
 * client authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
  if (req.client.user.id !== req.user.id) {
    return res.status(403).send('User is not authorized');
  }
  next();
};
