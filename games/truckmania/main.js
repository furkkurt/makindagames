var config = {
  type: Phaser.AUTO,
  width: 900,
  height: 450,
  backgroundColor: "#D1FFBD",
  scale: {
    mode: Phaser.Scale.FIT,
  },
  physics: {
      default: 'arcade',
    arcade: {debug: true}
  },
  scene:[preloader, test],
  pixelArt: true,
};

var game = new Phaser.Game(config);
