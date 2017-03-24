var Menu = {};
Menu.preload = function(){
}
Menu.update = function(){
  if(this.game.input.activePointer.justPressed()) {
    this.game.state.start('play');
  }
}
Menu.create = function(){
  console.log('create');
  var style = { font: '65px Arial', fill: '#ffffff', align: 'center'};
  var text = this.game.add.text(this.game.width/2, 100, 'Tic-Tac-Toe', style);
  text.anchor.setTo(0.5, 0.5);

  style.font = '32px Arial';
  this.text = this.game.add.text(this.game.width/4, 200, 'Create', style);
  text.anchor.setTo(0.5, 0.5);

  text = this.game.add.text(this.game.width/4*3, 200, 'Join', style);
  text.anchor.setTo(0.5, 0.5);
}
