var io, socket;
var randomString = require('make-random-string');
var rooms = [];
module.exports = {};
module.exports.init = function(_io, _socket){
  io = _io;
  socket = _socket;
  socket.emit('connected', {msg: 'You are conected'});
  socket.on('createNewGame', createNewGame);
  socket.on('joinGame', joinGame);
  socket.on('listRooms', listRooms);
}
function createNewGame(){
  var pid = 'room-'+randomString(20);
  this.emit('createdNewGame', {gameid: pid, socketid: this.id});
  this.join(pid);
  rooms.push(pid);
}
function listRooms(){
  this.emit('gettedListRooms', rooms);
}
function joinGame(data){
  this.emit('joinedGame', data);
  var gameid = data.gameid;
  this.join(gameid);
  io.sockets.in(gameid).emit('otherJoinedRoom', data);
}
