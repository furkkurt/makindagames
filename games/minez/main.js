var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 450,
  scale: {
    mode: Phaser.Scale.RESIZE,
  },
  physics: {
    default: "arcade",
    arcade: {
      debug: false
    }
  },
  scene: [preloader, map],
  pixelArt: true,
  backgroundColor: "#FFFFFF"
};

var game = new Phaser.Game(config);
