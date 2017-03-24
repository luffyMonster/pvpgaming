'use strict'

var  Boot = {};
Boot.preload =  function(){
      this.load.image('preloader', 'assets/preloader.gif');
};
Boot.create = function(){
    this.game.input.maxPointers = 1;
    this.game.state.start('preload');
}
