class preloader extends Phaser.Scene {
  constructor() {
    super("boot");
  }
  preload() {
    this.load.tilemapTiledJSON("test", "assets/maps/test.json");
    this.load.image("tile", "assets/img/tileset.png");
    this.load.image("frontRed", "assets/img/frontRed.png");
    this.load.image("backDefault", "assets/img/backDefault.png");
	}

  create() {
    this.scene.start("test");
  }
}
