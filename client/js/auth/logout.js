var logout = function(){
  $.ajax({
    type: 'get',
    url: '/api/user/logout'
  }).then(function(data){
    // console.log(data);
  }).fail(function(error) {
    console.log(error);
  //  alert(error.statusText + ': ' + error.responseJSON.message);
  }).always(function(){
    $.removeCookie('user');
    $.removeCookie('token');
    window.location.href = "";
  })
}
