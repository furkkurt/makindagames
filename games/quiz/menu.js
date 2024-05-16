class menu extends Phaser.Scene {
	constructor() {
		super('menu')
	}

	create() {
		let { width, height } = this.sys.game.canvas
		this.add.image(0, 0, 'bg').setScale(8)
		this.playBut = this.add
			.sprite(width / 2, height / 2, 'playBut')
			.setScale(8)
			.setOrigin(0.5, 0)
			.setInteractive()
		this.playBut.on('pointerdown', () => {
			this.scene.start('quiz')
		})
	}
}
