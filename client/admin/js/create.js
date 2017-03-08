$(document).ready(function(){
  $('_create').click(function(){
    console.log('aaa');
    $('modal_create').modal('toggle');
  });
  $('#create-form').submit(function(event){
    event.preventDefault();
    $('#result').empty();
    var data = {};
    $.each($('#create-form').serializeArray(), function(i, v){
      data[v.name] = v.value;
    });
    $.ajax({
      type: "post",
      url: "/api/user/create",
      data: data
    }).then(function(data){
      if (data.status){
        $('#result').append($.parseHTML('<p>Success</p>'));
      } else {
        $('#result').append($.parseHTML('<p>Failure</p>'));
      }
    }).fail(function(err){
      console.log(err);
    });
  });

});
