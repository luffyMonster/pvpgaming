//TODO: add package.json
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);
var mongoose = require('mongoose');
var randomString = require('make-random-string');
var bodyParser = require('body-parser');
var game = require('./caro');
server.listen(process.env.PORT || 8081,function(){
    console.log('Listening on '+server.address().port);
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});

io.sockets.on('connection', function(socket){
  game.init(io, socket);
});
