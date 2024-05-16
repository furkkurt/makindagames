class menu extends Phaser.Scene {
	constructor() {
		super('menu')
	}

	create() {
		let { width, height } = this.sys.game.canvas
		this.bg = this.add.image(0, 0, 'bg')
		this.bg.scaleX = 1.182
		this.bg.scaleY = 1.065
		this.playBut = this.add
			.sprite(width / 2, height / 2, 'playBut')
			.setScale(8)
			.setOrigin(0.5, 0)
			.setInteractive()
		this.playBut.on('pointerdown', () => {
			this.scene.start('hangman', {word: 1, lives: 6})
		})
	}
}
