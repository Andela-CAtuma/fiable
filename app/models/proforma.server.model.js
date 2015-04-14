'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 *Proforma Schema
 */
var PinvoiceSchema = new Schema({
  quotationNo: {
    type: String,
    trim: true,
    required: 'fill in Proforma Invoice Number',
    unique : 'Quotation Number exist'
  },
  numero: {
    type: String,
    trim: true,
    required: 'fill in numero'
  },
  reference: {
    type: String
  },
  quotations: [{

     description: {
      type: String,
      trim: true,
      required: 'fill in description'
    },
    qtes: {
      type: Number,
      trim: true,
      required: 'qtes cannot be blank'
    },
    unitPrice: {
      type: Number,
      trim: true,
      required: 'unit price cannot be blank'
    },
    unitTotal: {
      type: Number,
      trim: true,
      required: 'unit total cannot be blank'
    }
  }],
  total: {
      type: Number,
      trim: true,
      required: 'total cannot be blank'
    },
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  client: {
        type: Schema.ObjectId,
        ref: 'Client'
  }
});

mongoose.model('Pinvoice', PinvoiceSchema);
