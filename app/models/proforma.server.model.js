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
    proformaInvoiceNo: {
        type: Number,
        trim: true,
        required: 'fill in Proforma Invoice Number'
    },
    supplierNo: {
        type: String,
        trim: true,
        required: 'fill in Supplier Number'
    },
    items: [{
        type: Schema.ObjectId,
        ref: 'Item'
    }],
    client: {
        type: Schema.ObjectId,
        ref: 'Client'
    },
});

mongoose.model('Pinvoice', PinvoiceSchema);
