
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

    $('#signin').submit(function(event) {
      var username = $('#username').val();
      var password = $('#password').val();
      $.ajax({
        type  : "post",
        url   : "/api/auth/local",
        data  : {
          username: username,
          password: password
        }
      }).then(function(data){
        if (data) {
          if (data.token) {
            alert("Login success!");
          }
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
