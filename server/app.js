'use strict';

var express = require('express');
var config = require('./config/environment');
var http = require('http');
// Setup server
var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);
var chat = require('./chat')
require('./config/express')(app);

// config routes
require('./routes')(app);

// config DB
var mongoose = require('mongoose');
//mongoose.connect('mongodb://admin:123456@ds151697.mlab.com:51697/techkids');
mongoose.connect('mongodb://localhost/web4');
//
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'DB connection error: '));
db.once('open', function() {
  console.log('DB connection success! ');
});


// Start server
server.listen(config.port, config.ip, function() {
    console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
    console.log('Type "gulp game-serve" to start game-server on other cmd');
});
io.on('connection', function(socket) {
  console.log('connection');
  chat.init(io, socket);
});
// Expose app
exports = module.exports = app;
