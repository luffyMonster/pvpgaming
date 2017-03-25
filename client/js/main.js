$(document).ready(function () {
  var itemGameTopTemplate = Handlebars.compile($("#item-game-top-template").html());
  $.ajax({
    type  : "get",
    url   : "/api/game/list"
  }).then(function(data){
    console.log(data);
    var itemHtml = $(itemGameTopTemplate(data.result.splice(0, 4)));
    $("#item_list").append(itemHtml);
  }).fail(function(error){
    console.log(error);
  }).always(function(){
  });
  $('body').on('click', '#logout', function(e){
    $.ajax({
      type: 'get',
      url: '/api/user/logout'
    }).then(function(data){
      alert(data.message)
      window.location.href = "/"
    }).fail(function(err) {
      console.log(err)
    })
  })
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
          window.location.href = "/";
        }
      }
    }).fail(function(error){
      alert(error.responseJSON.message);
    }).always(function(){
    });
  })

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
        window.location.href = "/";
      } else {
        alert(data.message);
      }
    }).fail(function(error){
      console.log(error);
    }).always(function(){
    });
  })

  $('#features').css('visibility', 'hidden');
  $(window).on('scroll', function () {
      if ($(window).scrollTop() + window.innerHeight > $('#features').offset().top + 100) {
          $('#features').css('visibility', 'visible');
          $('.features_group').children().addClass('fadeInUp');
      }
  });

  $('#advantages').css('visibility', 'hidden');
  $(window).on('scroll', function () {
      if ($(window).scrollTop() + window.innerHeight > $('#advantages').offset().top + 100) {
          $('#advantages').css('visibility', 'visible');
          $('.thinking-box').children().eq(0).addClass('fadeInLeft');
          $('.thinking-box').children().eq(1).addClass('fadeInRight');
      }
  });

  $('.navbar-nav').on('click', function () {
      $('.collapse').collapse('hide');
  });

  $(window).on('scroll', function () {
      $('.collapse').collapse('hide');
  });

  $('a[href*="#"]:not([href="#"])').click(function () {
      if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
          if (target.length) {
              $('html, body').animate({
                  scrollTop: target.offset().top
              }, 1000);
              return false;
          }
      }
  });

  checkView('#home', '.navHome');
  checkView('#games', '.navGames');
  checkView('#features', '.navFeatures');
  checkView('#advantages', '.navAdvantages');
  checkView('#footer', '.navContact');

  $(window).on('scroll', function () {
      if ($(window).scrollTop() == 0) {
          $('.navbar-fixed-top').css("background-color", "transparent");
      } else {
          $('.navbar-fixed-top').css("background-color", "#141319");
      }
  });

  $('#login_modal').on('hidden.bs.modal', function (e) {
    $('#signin').trigger("reset");
  })

  $('#register_modal').on('hidden.bs.modal', function (e) {
    $('#signup').trigger("reset");
  })
});

function checkView(idElement, classElement) {
    $(window).on('scroll', function () {
        if (isScrolledIntoView(idElement)) {
            $('.active').removeClass('active');
            $(classElement).addClass('active');
        }
    });
}

function isScrolledIntoView(element) {
    var pageTop = $(window).scrollTop();
    var pageBottom = pageTop + $(window).height();
    var elementTop = $(element).offset().top;
    var elementBottom = elementTop + $(element).height();

    return ((pageTop <= elementTop) && (pageBottom >= elementBottom));
}
