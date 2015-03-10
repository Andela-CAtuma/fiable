'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Fiableop Schema
 */
var InvoiceSchema = new Schema({
  InvoiceNo: {
    type: Number,
    trim: true,
    required: 'fill in Proforma Invoice Number'
  },
  purchaseOrderNo: {
    type: String,
    trim: true,
    required: 'fill in Purchase Order Number'
  },
  supplierNo: {
    type: String,
    trim: true,
    required: 'fill in Supplier Number'
  },
  AccountNo: {
    type: Number,
    trim: true,
    required: 'Must have Account Number'
  },
  description: {
    type: String,
    trim: true,
    required: 'fill in Description'
  },
  deliveryDate: {
    type: Date,
    required: 'must have a delivery Date'
  },
  qtes: {
    type: Number,
    trim: true,
    required: 'cannot be blank'
  },
  unitPrice: {
    type: Number,
    trim: true,
    required: 'cannot be blank'
  },
  unitTotal: {
    type: Number,
    trim: true,
    required: 'cannot be blank'
  },
  total: Number,
  created: {
    type: Date,
    default: Date.now
  },
  client: {
    type: Schema.ObjectId,
    ref:'Client'
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Invoice', InvoiceSchema);
