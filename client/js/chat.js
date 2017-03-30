$(document).ready(function(){
  var socket = io.connect();
  var sender;
  var msg_chat_template = Handlebars.compile($("#message-chat-template").html());
  if (user) {
    $('.user').html('Hey, ' + user.name);
    sender = user.name;
  } else {
    $('.user').html('Hey, Guest');
    sender = 'Guest';
  }
  $("#upClass").click(function () {
    $('#chat-service').addClass('fadeInUp');
    $('#chat-service').removeClass('hide');
    $('#chat-service-1').addClass('hide');
    $('#chat-service-1').removeClass('show');
  });

  $("#downClass").click(function () {
    $('#chat-service').removeClass('fadeInUp');
    $('#chat-service').addClass('hide');
    $('#chat-service-1').addClass('show');
  });

  $('body').on('click', '.send', function(e){
    e.preventDefault();
    var msg = $('#status_message').val();
    if (msg) {
      socket.emit('chat message', {sender, msg });
      $('#status_message').val('');
    }
    return false;
  });
  socket.on('chat message', function(data){
    console.log(data);
    var itemHtml = $(msg_chat_template(data));
    var objDiv = $('#divExample');
    objDiv.append(itemHtml);
    var scrollObj = $('.popup-messages');
    if (scrollObj.length > 0){
        // console.log(objDiv[0].scrollHeight);
        // console.log(objDiv.scrollTop());
        scrollObj.scrollTop(scrollObj[0].scrollHeight);
        // console.log(objDiv.scrollTop());
        // scrollObj.attr('scrollTop', scrollObj[0].scrollHeight);
        // console.log(scrollObj.scrollTop());
        // objDiv.prop('scrollTop', objDiv[0].scrollHeight);
    }
  })
})
