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
    created: {
        type: Date,
        default: Date.now
    },
    proforma: {
        type: Schema.ObjectId,
        ref: 'Pinvoice'
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

mongoose.model('Invoice', InvoiceSchema);
