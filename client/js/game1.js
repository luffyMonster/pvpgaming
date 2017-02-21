$(document).ready(function () {
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
});
