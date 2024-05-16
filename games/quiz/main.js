var config = {
	type: Phaser.AUTO,
	width: 640,
	height: 1136,
	scale: {
		mode: Phaser.Scale.FIT,
	},
	physics: {
		default: 'arcade',
		arcade: { debug: false },
	},
	scene: [preloader, menu, quiz],
	pixelArt: true,
}

var game = new Phaser.Game(config)
