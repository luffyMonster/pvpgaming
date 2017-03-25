var $_data = [];
var findUserById = function(id){
  var _user = {};
  $.each($_data, function(i, user){
    if (user._id === id){
      _user = user;
      return;
    }
  });
  return _user;
}
$(document).ready(function(){
  var userTemplate = Handlebars.compile($("#user-template").html());
  $('body').on('click', '#_create', function(){
    console.log('create');
    $('#modal_create').modal('toggle');
    $('.success').empty();
    $('.err_msg').empty();
  });

  $('body').on('click', '.btn_edit', function(){
    $('#modal_edit').modal('toggle');
    var user = findUserById(this.id.split('-')[1]);
    $('#modal_edit #username').val(user.username);
    $('#modal_edit #name').val(user.name);
    $('#modal_edit #age').val(user.age);
    if(user.gender === 'male') {
        $('#modal_edit input:radio[name=gender]').filter('[value=male]').prop('checked', true);
    } else {
      $('#modal_edit input:radio[name=gender]').filter('[value=female]').prop('checked', true);
    }
    if(user.role === 'admin') {
        $('#modal_edit input:radio[name=role]').filter('[value=admin]').prop('checked', true);
    } else {
      $('#modal_edit input:radio[name=role]').filter('[value=user]').prop('checked', true);
    }
    $('.success').empty();
    $('.err_msg').empty();
  });
  $('#edit-form').submit(function(event){
    event.preventDefault();
    $('#modal_edit #result').empty();
    var data = {};
    $.each($('#edit-form').serializeArray(), function(i, v){
      data[v.name] = v.value;
    });
    data['username'] = $('#username').val();
    $.ajax({
      type: "put",
      url: "/api/user/edit",
      data: {
        username : data.username,
        age : data.age,
        gender : data.gender,
        role : data.role,
        name : data.name
      }
    }).then(function(data){
      console.log(data);
      if (data.status){
        $('.success').html(data.message);
        $('.err_msg').html('');
      } else {
        $('.err_msg').html(data.message);
        $('.success').html('');
      }
    }).fail(function(err){
      console.log(err);
    });

  });
  $('#create-form').submit(function(event){
    event.preventDefault();
    var data = {};
    $.each($('#create-form').serializeArray(), function(i, v){
      data[v.name] = v.value;
    });
    $.ajax({
      type: "post",
      url: "/api/user/create",
      data: data
    }).then(function(data){
      console.log(data);
      if (data.status){
        $('.success').html(data.message);
        $('.err_msg').html('');
      } else {
        $('.err_msg').html(data.message);
        $('.success').html('');
      }
    }).fail(function(err){
      console.log(err);
    });
    $("form").trigger("reset");
  });

  $('body').on('click', '.btn_delete', function(){
    var user = findUserById(this.id.split('-')[1]);
    console.log(user.username);
    var confirm = window.confirm("Do you want to delete user: " + user.username + "?");
    if (confirm === true) {
      $.ajax({
        type: "delete",
        url: "/api/user/delete",
        data: {
          username: user.username
        }
      }).then(function(data){
        alert(data.message);
        location.reload();
      }).fail(function(err){
        console.log(err);
      });
    }
  });

  $('#search').submit(function(event){
    event.preventDefault();
    $('#user_item').empty();
    $.ajax({
      type: 'get',
      url: "/api/user/find",
      data: $('#search').serialize()
    }).then(function(data){
      $_data = data;
      data = {items: data};
      var userHtml = $(userTemplate(data));
      $('#user_item').append(userHtml);
    }).fail(function(err){
      console.log(err);
    });
  });

});
