class preloader extends Phaser.Scene {
	constructor() {
		super('boot')
	}

	preload() {
		this.load.image('ffBlue', 'assets/firefly_blue.png')
		this.load.image('ffGreen', 'assets/firefly_green.png')
		this.load.image('ffRed', 'assets/firefly_red.png')
		this.load.image('ffYellow', 'assets/firefly_yellow.png')
		this.load.image('net', 'assets/net.png')
		this.load.image('bubble', 'assets/bubble.png')
		this.load.image('playBut', 'assets/playBut.png')
		this.load.image('empty', 'assets/null.png')
		this.load.image('frog', 'assets/frog.png')
		this.load.image('orange', 'assets/orange.png')
		this.load.image('tomato', 'assets/tomato.png')
		this.load.image('horse', 'assets/horse.png')
		this.load.image('bullet', 'assets/bullet.png')
		this.load.image('bg', 'assets/sky.png')
		this.load.image('hearth', 'assets/hearth.png')
	}

	create() {
		this.scene.start('menu')
	}
}
