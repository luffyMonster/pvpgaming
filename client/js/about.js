$(document).ready(function () {
    $(window).on('scroll', function () {
        if ($(window).scrollTop() == 0) {
            $('.navbar-fixed-top').css("background-color", "transparent");
        } else {
            $('.navbar-fixed-top').css("background-color", "#141319");
        }
    });

    $('body').on('click', '#logout', function(e){
      $.ajax({
        type: 'get',
        url: '/api/user/logout'
      }).then(function(data){
        alert(data.message);
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
            alert("Login success!");
            window.location.href = "";
          }
        }
      }).fail(function(error){
        alert(error.responseJSON.message);
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
          alert(data.message);
          window.location.href = "";
        } else {
          alert(data.message);
        }
      }).fail(function(error){
        console.log(error);
      }).always(function(){
      });
    });

    if (user) {
      $('#btn_container').css('display', 'none');
      $('#user_box').css('display', 'absolute');
      $('#username_welcome').html('Hi, '  + user.username + '!');
    } else {
      $('#btn_container').css('display', 'absolute');
      $('#user_box').css('display', 'none');
    }
});
