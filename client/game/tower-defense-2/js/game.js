$(document).ready(function () {
    var gameId = '58db3346dfd40fadcfdba9e0';
    if (user) {
      var userId = user._id;
    }
    $('canvas:first').css('width', '100%');
    $('canvas:first').css('margin', '0');
    // var game = $('canvas:first');
    // game.remove();

    $('body').on('click', '#logout', function(e){
      logout();
    });

    $('#signin').submit(function(event) {
      event.preventDefault();
      var username = $('#username').val();
      var password = $('#password').val();
      login({ username, password });
    });

    $('#signup').submit(function(event) {
      event.preventDefault();
      var name = $('#name_reg').val();
      var username = $('#username_reg').val();
      var password = $('#password_reg').val();
      $.ajax({
        type  : "post",
        url   : "/api/user/create",
        data  : { name, username, password }
      }).then(function(data){
        if (data.status) {
          window.location.href = "";
        }
      }).fail(function(error){
        console.log(error);
      }).always(function(){
      });
    });

    if (user) {
      $.ajax({
        type  : "get",
        url   : "/api/game/getUserRatedById",
        data  : { gameId, userId }
      }).then(function(data){
        $("#input_rate").val(data.rate);
        $("#input_rate").rating();
      }).fail(function(error){
        console.log(error);
      }).always(function(){
      });
    }

    $("#input_rate").on("rating.clear", function(event) {
      var value = 0;
      $.ajax({
        type  : "post",
        url   : "/api/game/rateupdate",
        data  : { gameId, userId, value }
      }).then(function(data){
          console.log(data);
      }).fail(function(error){
        console.log(error);
      }).always(function(){
      });
    }).on("rating.change", function(event, value, caption) {
      $.ajax({
        type  : "post",
        url   : "/api/game/rateupdate",
        data  : { gameId, userId, value }
      }).then(function(data){
        console.log(data);
      }).fail(function(error){
        console.log(error);
      }).always(function(){
      });
    });

    if (user) {
      $('#btn_container').css('display', 'none');
      $('#user_box').css('display', 'absolute');
      $('#username_welcome').html('Hi, '  + user.username + '!');
      $('.game_holder').css('display', 'flex');
    } else {
      $('#btn_container').css('display', 'absolute');
      $('#user_box').css('display', 'none');
      $('.game_holder').css('display', 'none');
    }
});
