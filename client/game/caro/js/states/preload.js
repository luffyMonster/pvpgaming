var Preload = {};
Preload.asset = null;
Preload.ready = false;

Preload.preload = function(){
  this.asset = this.add.sprite(this.game.width/2, this.game.height/2, 'preloader');
  this.asset.anchor.setTo(0.5, 0.5);

  this.load.image('yeoman', 'assets/yeoman-logo.png');
  this.load.setPreloadSprite(this.asset);
  this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
  this.load.spritesheet('cell', 'assets/cell.png', 107, 107);
}
Preload.onLoadComplete = function(){
  this.ready = true;
}
Preload.create = function(){
  this.asset.cropEnabled = false;
}
Preload.update = function(){
  if (this.ready){
    this.game.state.start('menu');
  }
}
