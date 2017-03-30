$(document).ready(function () {
    var gameId = '58c56039265d8c025c6af590';
    if (user) {
      var userId = user._id;
    }

    $(window).on('scroll', function () {
        if ($(window).scrollTop() == 0) {
            $('.navbar-fixed-top').css("background-color", "transparent");
        } else {
            $('.navbar-fixed-top').css("background-color", "#141319");
        }
    });
    $('canvas:first').css('width', '100%');
    $('canvas:first').css('margin', '0');
    // var game = $('canvas:first');
    // game.remove();

    $('body').on('click', '#logout', function(e){
      $.ajax({
        type: 'get',
        url: '/api/user/logout'
      }).then(function(data){
        window.location.href = "";
      }).fail(function(err) {
        console.log(err)
      })
    });

    $('#signin').submit(function(event) {
      event.preventDefault();
      var username = $('#username').val();
      var password = $('#password').val();
      $.ajax({
        type  : "post",
        url   : "/api/auth/local",
        data  : { username, password }
      }).then(function(data){
        if (data) {
          if (data.token) {
            $.cookie('token', data.token);
            window.location.href = "";
          }
        }
      }).fail(function(error){
        console.log(error);
      }).always(function(){
      });
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
      console.log(gameId);
      console.log(userId);
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
        if (data.status) {
          console.log(data);
        }
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
