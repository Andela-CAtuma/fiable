'use strict';

/**
* Module dependencies.
*/
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
* Delivery Schema
*/
var DeliverySchema = new Schema({
    deliveryNo: {
        type: String,
        trim: true,
        required: 'fill in delivery Number',
        unique: 'Delivery Number '
    },
    created: {
        type: Date,
        default: Date.now
    },
    numero: {
        type: String,
        trim: true,
        required: 'fill in numero'
    },
   pon: {
        type: String,
        trim: true,
        required: 'fill in Purchase Order Number'
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

mongoose.model('Delivery', DeliverySchema);
