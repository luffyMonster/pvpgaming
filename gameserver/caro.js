var randomString = require('make-random-string');
var rooms = [];
var io = require('./server.js').io;
console.log(io);
module.exports.init = function(socket){
  socket.emit('connected', {msg: 'You are conected'});
  socket.on('createNewGame', createNewGame);
  socket.on('joinGame', joinGame);
  socket.on('listRooms', listRooms);
  socket.on('otherLeftRoom', function(data){
    io.sockets.in(data.socket).leave(data.id);
    setTimeout(io.sockets.in(data.id).emit('test', {msg: "i'm testing"}), 50);
  })
}
// socket -
function createNewGame(){
  var pid = 'room-'+randomString(20);
  this.emit('createdNewGame', {id: pid});
  rooms.push({id: pid});
  this.join(pid);
  io.emit('gettedListRooms', rooms);
}
function listRooms(){
  this.emit('gettedListRooms', rooms);
}
function joinGame(data){
  this.emit('joinedGame', data);
  var id = data.id;
  this.join(id);
  io.sockets.in(id).emit('otherJoinedRoom', data);
}
