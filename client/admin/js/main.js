$(document).ready(function(){
  if (user){
    $('#username').html(user.username);
    $('#name').html(user.name);
  }
});
