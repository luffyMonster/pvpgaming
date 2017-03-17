$(document).ready(function(){
  //Get game list
  var gameTemplate = Handlebars.compile($("#game-template").html());
  var $listgame = {};
  var findGameById = function(id){
    var result = {};
    $listgame.forEach(function(item){
      if (item._id === id){
        result = item;
        return;
      }
    });
    return result;
  };

  $.ajax({
    type: 'get',
    url: '/api/game/list'
  }).then(function(data){
    $listgame = data.result;
    data = {games: data.result};
    $('#game-item').append(gameTemplate(data));
  }).fail(function(err){
    return console.log(err);
  });

  //display modal
  $('body').on('click', '#_create', function() {
    $('input[type=text]').val('');
    $('#game-modal').modal('toggle');
    $('#gridSystemModalLabel').text('Create new Game');
    $('#submit').text('Create');
  });
  $('body').on('click', '.btn_edit', function(){
    $('#game-modal').modal('toggle');
    $('#gridSystemModalLabel').text('Edit Game Info');
    $('#submit').text('Save');
    var game = findGameById(this.id.split('-')[1]);
    var listinput = ['name', 'gameurl', 'logo', 'background', 'description'];
    // listinput.forEach(item){
    //   console.log(item);
    // //  $('#{item}').val(game[item]);
    // };
    $('#name').val(game.name);
    $('#gameurl').val(game.gameurl);
    $('#logo').val(game.logo);
    $('#background').val(game.background);
    $('#description').val(game.description);
  });

  $('body').on('click', '.btn_delete', function(){
    var game = findGameById(this.id.split('-')[1]);
    console.log(game);
    var confirm = window.confirm('Do you want delele game this game? ' + game.name);
    if (confirm){
      $.ajax({
        type: 'delete',
        url: '/api/game/delete',
        data: {name: game.name}
      }).then(function(data){
        alert(data.message);
        location.reload();
      }).fail(function(err){
        console.log(err);
      });
    }
  });
  //form process
  $('#game-form').submit(function(event){
    event.preventDefault();
      //Create & Edit
    var $data = {};
     $('#game-form').serializeArray().forEach(function(item){
      $data[item.name] = item.value;
    });
    // console.log($data);
    var objAjax = {};
    if ($('#submit').text() === 'Create'){
      objAjax = {
        type: 'post',
        url:  '/api/game/create',
        data: $data
      };
    } else{
      console.log('aaa');
      objAjax = {
        type: 'put',
        url: '/api/game/edit',
        data: $data
      };
    };
    //call ajax
    console.log(objAjax);
    $.ajax(objAjax).then(function(data){
      $('#result').html(data.message);
    }).fail(function(err){
      console.log(err);
    });
  });
});
