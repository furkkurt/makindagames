var config = {
	type: Phaser.AUTO,
	width: 1136,
	height: 640,
	scale: {
		mode: Phaser.Scale.FIT,
	},
	physics: {
		default: 'arcade',
		arcade: { debug: false },
	},
	scene: [preloader, menu, hangman],
	pixelArt: true,
}

var game = new Phaser.Game(config)
