
// 'use strict';

// /**
//  * Module dependencies.
//  */
// var mongoose = require('mongoose'),
//   Schema = mongoose.Schema;

// /**
//  * Fiableop Schema
//  */
// var ItemsSchema = new Schema({
//   description: {
//     type: String,
//     trim: true,
//     required: 'fill in description'
//   },
//   qtes: {
//     type: Number,
//     trim: true,
//     required: 'cannot be blank'
//   },
//   unitPrice: {
//     type: Number,
//     trim: true,
//     required: 'cannot be blank'
//   },
//   unitTotal: {
//     type: Number,
//     trim: true,
//     required: 'cannot be blank'
//   },
//   deliveryDate: {
//     type: Date,
//     required: 'must have a delivery Date'
//   },
//   created: {
//     type: Date,
//     default: Date.now
//   },
//   user: {
//     type: Schema.ObjectId,
//     ref: 'User'
//   }
// });
// mongoose.model('Item', ItemsSchema);

