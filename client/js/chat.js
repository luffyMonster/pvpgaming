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
  $("#upClass, #chat-service-1").click(function () {
    $('#chat-service').addClass('fadeInUp');
    $('#chat-service').removeClass('hide');
    $('#chat-service-1').addClass('hide');
    $('#chat-service-1').removeClass('show');
    $('#status_message').focus();
  });

  $("#downClass, #chat-service .popup-head").click(function () {
    $('#chat-service').removeClass('fadeInUp');
    $('#chat-service').addClass('hide');
    $('#chat-service-1').addClass('show');
  });

  $('#clear-msg').on('click', function(e){
    e.stopPropagation();
    $('#chat-area').html('');
  })

  $('#status_message').on('keypress', function (e) {
         if(e.which === 13){
            //Disable textbox to prevent multiple submit
            $(this).attr("disabled", "disabled");
            e.preventDefault();
            var msg = $('#status_message').val();
            if (msg) {
              socket.emit('chat message', {sender, msg });
              $('#status_message').val('');
            }
            $(this).attr("disabled", null);
            $('#status_message').focus();
            return false;
         }
   });
  $('body').on('click', '.send', function(e){
    e.preventDefault();
    var msg = $('#status_message').val();
    if (msg) {
      socket.emit('chat message', {sender, msg });
      $('#status_message').val('');
      $('#status_message').focus();
    }
    return false;
  });
  socket.on('chat message', function(data){
    console.log(data);
    var itemHtml = $(msg_chat_template(data));
    var objDiv = $('#chat-area');
    objDiv.append(itemHtml);
    var scrollObj = $('.popup-messages');
    if (scrollObj.length > 0){
        scrollObj.scrollTop(scrollObj[0].scrollHeight);
    }
  })
})
