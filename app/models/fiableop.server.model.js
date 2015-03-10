'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Fiableop Schema
 */
var FiableopSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Fiableop name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Fiableop', FiableopSchema);