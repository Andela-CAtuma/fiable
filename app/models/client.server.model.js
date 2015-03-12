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
    trim: true
  },
  address:{
    type: String,
  },
  location:{
    type: String,
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
