var Play = {};
Play.create = function(){
  var CELL_WIDTH, CELL_HEIGHT,
      CELL_COLS, CELL_ROWS;

      CELL_WIDTH = CELL_HEIGHT = 107;
      CELL_COLS = CELL_ROWS = 3;

  this.cells = this.game.add.group();
  this.player = 1;

  this.cells.physicsBodyType = Phaser.Physics.ARCADE;

  for (var i = 0; i < CELL_COLS; i++) {
    for (var j = 0; j < CELL_ROWS; j++) {
      var cell = this.cells.create(i * CELL_WIDTH, j * CELL_HEIGHT, 'cell');
      cell.frame = 0;
      cell.inputEnabled = true;
      cell.events.onInputDown.add(this.addPlayerMarker, this);
      this.game.physics.arcade.enable(cell);
    }
  }
  this.game.physics.startSystem(Phaser.Physics.ARCADE);
}
Play.addPlayerMarker = function(sprite, pointer){
  if(sprite.frame === 0) {
    sprite.frame = this.player;
    this.player = this.player === 1 ? 2 : 1;
  }
}
