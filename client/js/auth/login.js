var login = function(data){
  $.ajax({
    type  : "post",
    url   : "/api/auth/local",
    data  : data
  }).then(function(data){
    if (data) {
      if (data.token && !$.cookie('token')) {
        $.cookie('token', data.token);
      }
      if (data.user && !$.cookie('user'))   $.cookie('user', data.user);
      window.location.href = "";
    }
  }).fail(function(error){
    alert(error.statusText + ': ' + error.responseJSON.message);
  }).always(function(){
  });
}
