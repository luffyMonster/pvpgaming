var Chat = {};
Chat.init = function(io, socket){
  Chat.io = io;
  socket.on('chat message', function(data){
    console.log(data);
    io.emit('chat message', data);
  });
}
module.exports = Chat;
