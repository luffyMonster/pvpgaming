var preloadState = {
  preload: function() {
    console.log(this);
    this.asset = this.add.sprite(0, 0, 'preloader');
    this.asset.anchor.setTo(0.5, 0.5);

    // this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    // this.load.setPreloadSprite(this.asset);
  },
  create: function() {
    this.asset.cropEnabled = false;
  },
  update: function() {
    if(!!this.ready) {
      this.game.state.start('menu');
    }
  },
  onLoadComplete: function() {
    this.ready = true;
  }
};
