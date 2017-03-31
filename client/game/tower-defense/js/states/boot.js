var bootState = {
  preload: function() {
    console.log(this);
    this.load.image('preloader', 'Assets/preloader.gif');
  },
  create: function() {
    this.game.input.maxPointers = 1;
    this.game.state.start('preload');
  }
}
