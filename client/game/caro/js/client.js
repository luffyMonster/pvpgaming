$(document).ready(function(){
  /**
   * Created by Jerome on 03-03-17.
   */
  var Game = {};
  var IO = {};

  //IO socket
  IO.init = function(){
    this.socket = io.connect('localhost:8081');
    this.bindEvents();
  }
  IO.bindEvents = function(){
    IO.socket.on('connected', function(data){
      console.log(data);
    });
    // IO.socket.emit('createNewGame');
    IO.socket.on('createdNewGame', function(data){
      Game.data = data;
    });
  }

  //Game config
  Game.init = function(){
    this.getTemplate();
    this.showStartScreen();
    this.bindEvents();
  }
  Game.getTemplate = function(){
    this.$startScreen = $('#start-screen-template').html();
    this.$listRoomsScreen = $('#list-rooms-screen-template').html();
    this.$createGame = $('#create-game-template').html();
    this.$gamePlay = $('#gameplay-template').html();
  }
  Game.bindEvents = function(){
    var $doc = $(document);
    $doc.on('click', '#btnCreateGame', this.onCreateButtonClick);
    $doc.on('click', '#btnJoinGame', this.onJoinButtonClick);
    $doc.on('click', '.join-a-room', this.onJoinARoomButton);
    IO.socket.on('otherJoinedRoom', this.playGame);
  }
  Game.showStartScreen = function(){
    $('#gameArea').html(this.$startScreen);
  }
  Game.onCreateButtonClick = function(){
    IO.socket.emit('createNewGame');
    $('#gameArea').html(Game.$createGame);
  }
  Game.onJoinButtonClick = function(event){
    event.preventDefault();
    IO.socket.emit('listRooms');
    IO.socket.on('gettedListRooms', function(rooms){
      console.log(rooms);
      $('#gameArea').html(Game.$listRoomsScreen);
      rooms.forEach(function(room){
        var rhtml = `<li>${room} <button class='btn join-a-room' id=${room} value='${room}'>Join</button></li>`
        $('#gameArea .list-rooms').append(rhtml);
      });
    });
  }
  Game.onJoinARoomButton = function(){
    console.log('joinbtn');
    IO.socket.emit('joinGame', {gameid: this.value});
  }
  Game.playGame = function(data){
    console.log('GAme play');
    $('#gameArea').html(Game.$gamePlay);
  }
  //Run
  IO.init();
  Game.init();

});
