'use strict';

/**
* Module dependencies.
*/
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
* Invoice Schema
*/
var InvoiceSchema = new Schema({
    invoiceNo: {
        type: String,
        trim: true,
        required: 'fill in Invoice Number',
        unique: 'Invoice Number exist'
    },
    pon: {
        type: String,
        trim: true,
        required: 'fill in Purchase Order Number'
    },
    numero: {
        type: String,
        trim: true,
        required: 'fill in numero'
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
