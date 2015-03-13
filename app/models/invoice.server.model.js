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
    invoiceNo: {
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
    accountNo: {
        type: Number,
        trim: true,
        required: 'Must have Account Number'
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

mongoose.model('Invoice', InvoiceSchema);
