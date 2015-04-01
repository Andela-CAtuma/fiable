'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Fiableop Schema
 */
var PinvoiceSchema = new Schema({
  quotationNo: {
    type: String,
    trim: true,
    required: 'fill in Proforma Invoice Number'
  },
  numero: {
    type: String,
    trim: true,
    required: 'fill in numero'
  },
  // reference: {
  //   type: String
  // },
  // description: [{
  //   type: String,
  //   trim: true,
  //   required: 'fill in description'
  // }],
  // qtes: [{
  //   type: Number,
  //   trim: true,
  //   required: 'cannot be blank'
  // }],
  // unitPrice: [{
  //   type: Number,
  //   trim: true,
  //   required: 'cannot be blank'
  // }],
  // unitTotal: [{
  //   type: Number,
  //   trim: true,
  //   required: 'cannot be blank'
  // }],
  // created: {
  //   type: Date,
  //   default: Date.now
  // },
  // user: {
  //   type: Schema.ObjectId,
  //   ref: 'User'
  // },
  client: {
        type: Schema.ObjectId,
        ref: 'Client'
  }
});

mongoose.model('Pinvoice', PinvoiceSchema);
