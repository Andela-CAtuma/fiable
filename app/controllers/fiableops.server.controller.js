'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Fiableop = mongoose.model('Fiableop'),
	_ = require('lodash');

/**
 * Create a Fiableop
 */
exports.create = function(req, res) {
	var fiableop = new Fiableop(req.body);
	fiableop.user = req.user;

	fiableop.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(fiableop);
		}
	});
};

/**
 * Show the current Fiableop
 */
exports.read = function(req, res) {
	res.jsonp(req.fiableop);
};

/**
 * Update a Fiableop
 */
exports.update = function(req, res) {
	var fiableop = req.fiableop ;

	fiableop = _.extend(fiableop , req.body);

	fiableop.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(fiableop);
		}
	});
};

/**
 * Delete an Fiableop
 */
exports.delete = function(req, res) {
	var fiableop = req.fiableop ;

	fiableop.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(fiableop);
		}
	});
};

/**
 * List of Fiableops
 */
exports.list = function(req, res) { Fiableop.find().sort('-created').populate('user', 'displayName').exec(function(err, fiableops) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(fiableops);
		}
	});
};

/**
 * Fiableop middleware
 */
exports.fiableopByID = function(req, res, next, id) { Fiableop.findById(id).populate('user', 'displayName').exec(function(err, fiableop) {
		if (err) return next(err);
		if (! fiableop) return next(new Error('Failed to load Fiableop ' + id));
		req.fiableop = fiableop ;
		next();
	});
};

/**
 * Fiableop authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.fiableop.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};