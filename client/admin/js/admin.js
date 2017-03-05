$(document).ready(function(){
  var userTemplate = Handlebars.compile($("#user-template").html());
  $('#search').submit(function(event){
    event.preventDefault();

    $.ajax({
      type: 'get',
      url: "/api/admin/search",
      data: $('#search').serialize()
    }).then(function(data){
      console.log(data);
      data = {items: data};
      var userHtml = $(userTemplate(data));
      console.log(data);
      $('#user_item').append(userHtml);
    }).fail(function(err){
      console.log(err);
    });
  });

});
