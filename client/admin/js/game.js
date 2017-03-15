$(document).ready(function(){
  //Get game list
  var gameTemplate = Handlebars.compile($("#game-template").html());
  $.ajax({
    type: 'get',
    url: '/api/game/list'
  }).then(function(data){
    data = {games: data.result};
    console.log(gameTemplate(data));
    $('#game-item').append(gameTemplate(data));
  }).fail(function(err){
    return console.log(er);
  });

  //display modal
  $('body').on('click', '#_create', function() {
    $('#game-modal').modal('toggle');
    $('#gridSystemModalLabel').text('Creat new Game');
    $('#submit').text('Create');
  });

  //form process
  $('#game-form').submit(function(event){
    event.preventDefault();
      //Create & Edit
    var $data = {};
     $('#game-form').serializeArray().forEach(function(item){
      $data[item.name] = item.value;
    });
    console.log($data);
    if ($('#submit').text() === 'Create'){
      $.ajax({
        type: 'post',
        url:  '/api/game/create',
        data: $data
      }).then(function(data){
        console.log('Create: ');
        console.log(data);
        $('#result').html(data.message);
      }).fail(function(err){
        console.log(err);
      });
    } else{
      console.log('Other');
    }
  });
});
