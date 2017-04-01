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
    $('.success').empty();
    $('.err_msg').empty();
    $('#name').prop('readonly', false);
  });
  $('body').on('click', '.btn_edit', function(){
    $('#game-modal').modal('toggle');
    $('#gridSystemModalLabel').text('Edit Game Info');
    $('#submit').text('Save');
    var game = findGameById(this.id.split('-')[1]);
    var listinput = ['name', 'gameurl', 'logo', 'background', 'description'];
    $('#name').prop('readonly', true);
    listinput.forEach(function(item){
      // console.log(item);
      $(`#${item}`).val(game[item]);
    });
    $('.success').empty();
    $('.err_msg').empty();
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
      objAjax = {
        type: 'put',
        url: '/api/game/edit',
        data: $data
      };
    };
    //call ajax
    $.ajax(objAjax).then(function(data){
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
});
