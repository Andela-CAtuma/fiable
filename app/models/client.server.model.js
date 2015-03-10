'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Fiableop Schema
 */
var ClientSchema = new Schema({
  name: {
    type: String,
    required: 'Please fill in a client name',
    trim: true
  },
  address:{
    type: String,
    required: 'client must have an email address'
  },
  location:{
    type: String,
    required: 'client must have a location'
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

mongoose.model('Client', ClientSchema);
