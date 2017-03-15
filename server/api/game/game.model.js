'use strict';

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var Schema = mongoose.Schema;
var findOrCreate = require('mongoose-find-one-or-create');

var game = new Schema({
  name: String,
  gameurl: String,
  background: String,
  logo: String,
  description: String
});
var model = mongoose.model('Game', game);
module.exports = model;
