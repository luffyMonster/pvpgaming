'use strict'
window.onload = function(){
  var game = new Phaser.Game(24*32, 17*32, Phaser.AUTO, document.getElementById('game-area'));
  game.state.add('boot', Boot);
  game.state.add('preload', Preload);
  game.state.add('menu', Menu);
  game.state.add('play', Play);
  game.state.add('end', End);
  console.log(game);
  game.state.start('boot');
};
