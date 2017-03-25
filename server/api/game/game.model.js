'use strict';

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var Schema = mongoose.Schema;
var findOrCreate = require('mongoose-find-one-or-create');

var RateSchema = new Schema({
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  value: Number
});
var GameSchema = new Schema({
  name: String,
  gameurl: String,
  background: String,
  logo: String,
  description: String,
  rates: {type: [RateSchema], default: []}
});

var model = mongoose.model('Game', GameSchema);
module.exports = model;
