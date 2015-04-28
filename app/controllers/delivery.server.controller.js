'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  errorHandler = require('./errors'),
  Client = mongoose.model('Client'),
  Pinvoice = mongoose.model('Pinvoice'),
  Delivery = mongoose.model('Delivery'),

  _ = require('lodash');

/**
 * Create a  delivery
 */
 exports.create = function(req, res) {
  var delivery = new Delivery(req.body);
    delivery.user = req.user;
    delivery.client = req.client;
    delivery.proforma = req.proforma;
    delivery.save(function(err) {
      if (err) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {

        res.jsonp(delivery);
      }
    });    
  };

  /**
   * Show the current delivery
   */

  exports.read = function(req, res) {
    res.jsonp(req.delivery);
  };

/**
 * Update a delivery
 */
  exports.update = function(req, res) {
    var delivery = req.delivery;

    delivery = _.extend(delivery, req.body);

    delivery.save(function(err) {
      if (err) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {
        res.jsonp(delivery);
      }
    });
  };

/**
 * Delete an delivery
 */

  exports.delete = function(req, res) {
    var delivery = req.delivery;

    delivery.remove(function(err) {
      if (err) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {
        res.jsonp(delivery);
      }
    });
  };

/**
 * List of delivery
 */

  exports.list = function(req, res) {
    Delivery.find({
      user: req.user
    }).sort('-created').populate('user', 'displayName').exec(function(err, delieveries) {
      if (err) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {
        res.jsonp(delieveries);
      }
    });
  };

/**
 * delivery middlewares
 */

exports.uniqueDeliveryNumber = function(req, res, next){
   var deliveryNo = req.body.deliveryNo;
   Delivery.find().exec(function(err, delieveries){
    console.log('delivery', delieveries);
    _.forEach(delieveries, function(delivery, key){
      if(deliveryNo === delivery.deliveryNo){
        console.log('error');
          return res.status(403).send({
            message: 'Delivery Number Exist'
          });
      }
    });
   });
   next();

 };

  exports.deliveryById = function(req, res, next, id) {
    Delivery.findById(id).populate('user', 'displayName').exec(function(err, delivery) {
      if (err) return next(err);
      if (!delivery) return next(new Error('Failed to load delivery ' + id));
      req.delivery = delivery;
      next();
    });
  };

  exports.clientDeliveryById = function(req, res, next) {
    Client.findById(req.params.clientId).populate('user', 'displayName').exec(function(err, client) {
      if (err) return next(err);
      if (!client) return next(new Error('Failed to load delivery '));
      req.client = client;
      next();
    });
  };

exports.clientProformaDeliveryById = function(req, res, next) {
    Pinvoice.findById(req.params.proformaId).populate('user', 'displayName').exec(function(err, proforma) {
      if (err) return next(err);
      if (!proforma) return next(new Error('Failed to load delivery '));
      req.proforma = proforma;
      next();
    });
};

/**
 * delivery authorization middleware
 */

exports.hasAuthorization = function(req, res, next) {
  if (req.delivery.user.id !== req.user.id) {
    return res.status(403).send('User is not authorized');
  }
  next();
};
