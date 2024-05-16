class quiz extends Phaser.Scene {
	constructor() {
		super('quiz')
	}

	create() {
		this.score = 0
		this.question = 0
		this.count = 15
		let { width, height } = this.sys.game.canvas

		this.add.image(0, 0, 'bg').setScale(8)
		this.frog = this.add
			.sprite(width / 2, height, 'frog')
			.setOrigin(0.5, 1)
			.setScale(6)

		this.bubble = this.add.sprite(10, 960, 'bubble').setDepth(99).setOrigin(0, 1)
		this.text = this.add.text(this.bubble.x + 50, this.bubble.y - 50, '', {color: 'black', fontSize: '24px'}).setDepth(99)

		this.countText = this.add.text(width / 2, 0, '', { fontSize: '64px' }).setOrigin(0.5, 0)
	
		this.options = []
		this.countEvent = this.time.addEvent({
			delay: 1000,
			callback: () => {
			this.count--
				this.countText.text = this.count
				if (this.count <= 0) {
					this.countText.setVisible(false)
					this.bubble.visible = this.text.visible = false
					this.displayAnswers(this.options)
					this.countEvent.paused = true
				}
			},
			loop: true, paused: true
		})


		this.questions = [
			['what is the color of the sky?', 'TBlue', 'FYellow', 'FGreen', 'Fpurple'],
			['what is the powerhouse of the cell?', 'TMitochondria', 'FNucleus', 'FLisosome', 'FMembrane'],
			['What is the fastest mammal?', 'TCheetah', 'FElephant', 'FTiger', 'FBear'],
		]
		this.speak(this.questions[this.question])

		this.path1 = this.add.path(0, 100)
		this.path1.lineTo(150, 100)
		this.path1.lineTo(640, 900)

		this.path2 = this.add.path(640, 100)
		this.path2.lineTo(490, 100)
		this.path2.lineTo(0, 900)

		this.path3 = this.add.path(640, 250)
		this.path3.lineTo(490, 250)
		this.path3.lineTo(150, 250)
		this.path3.lineTo(150, 100)
		this.path3.lineTo(490, 100)
		this.path3.lineTo(490, 250)
		this.path3.lineTo(0, 1000)

		this.path4 = this.add.path(0, 250)
		this.path4.lineTo(150, 250)
		this.path4.lineTo(490, 250)
		this.path4.lineTo(490, 100)
		this.path4.lineTo(150, 100)
		this.path4.lineTo(150, 250)
		this.path4.lineTo(640, 1000)

		this.screen = this.add.sprite(0,0,"null").setOrigin(0).setInteractive().setDepth(999)
		this.screen.scaleX = width/this.screen.width
		this.screen.scaleY = height/this.screen.height

		this.screen.on("pointerdown", () => {
			if(this.count>1){
				this.count--
				this.countText.text = this.count
				if (this.count == 0)
					this.countEvent.paused = true
			}
		})
	}

	speak(question) {
		this.text.text = ""
		this.text.y = 910
		this.frog.play('frogTalk')
		this.bubble.visible = this.text.visible = true

		let letter = 0
		this.time.addEvent({
			delay: 20,
			callback: () => {
				this.text.text += question[0].substring(letter, letter + 1)
				letter++
				if (letter % 36 == 0) {
					this.text.text = this.text.text.slice(0, letter) + '\n' + this.text.text.slice(letter)
					this.text.y -= 32
				}
				this.bubble.scaleX = this.text.width / this.bubble.width + 3
				this.bubble.scaleY = (this.text.height * 1.3) / this.bubble.height + 2
				if (letter == question[0].length) {
					this.countDown(question)
					this.frog.play('frogIdle')
				}
			},
			repeat: question[0].length,
		})
	}

	countDown(options) {
		this.options = options
		this.count = 15
		this.countText.text = '15'
		this.countText.setVisible(true)
		this.countEvent.paused = false
	}

	displayAnswers(options) {
		for (let i = options.length - 1; i > 0; i--) {
			const j = 1 + Math.floor(Math.random() * i)
			const temp = options[i]
			options[i] = options[j]
			options[j] = temp
		}
		let redOption = this.add.text(0, 0, options[1].slice(1), { fontSize: '24px' }).setOrigin(0, 0.5)
		let blueOption = this.add.text(0, 0, options[2].slice(1), { fontSize: '24px' }).setOrigin(0, 0.5)
		let greenOption = this.add.text(0, 0, options[3].slice(1), { fontSize: '24px' }).setOrigin(0, 0.5)
		let yellowOption = this.add.text(0, 0, options[4].slice(1), { fontSize: '24px' }).setOrigin(0, 0.5)
		let ffRed = this.add.follower(this.path1, 0, 100, 'ffRed')
		let ffBlue = this.add.follower(this.path2, 640, 100, 'ffBlue')
		let ffGreen = this.add.follower(this.path3, 640, 250, 'ffGreen')
		let ffYellow = this.add.follower(this.path4, 0, 250, 'ffYellow')
		this.physics.add.existing(ffRed)
		this.physics.add.existing(ffYellow)
		this.physics.add.existing(ffGreen)
		this.physics.add.existing(ffBlue)
		ffRed.startFollow(3000)
		ffBlue.startFollow(3000)
		ffGreen.startFollow(5000)
		ffYellow.startFollow(5000)
		this.time.addEvent({
			delay: 20,
			callback: () => {
				redOption.x = ffRed.x + 35
				redOption.y = ffRed.y
				blueOption.x = ffBlue.x + 35
				blueOption.y = ffBlue.y
				greenOption.x = ffGreen.x + 35
				greenOption.y = ffGreen.y
				yellowOption.x = ffYellow.x + 35
				yellowOption.y = ffYellow.y
			},
			loop: true,
		})

		this.time.addEvent({
			delay: 500,
			callback: () => {
				ffYellow.pauseFollow()
				ffRed.pauseFollow()
				ffGreen.pauseFollow()
				ffBlue.pauseFollow()
			},
		})
		this.time.addEvent({
			delay: 3500,
			callback: () => {
				ffYellow.resumeFollow()
				ffRed.resumeFollow()
				ffGreen.resumeFollow()
				ffBlue.resumeFollow()
				const net = this.physics.add.sprite(300, 1000, 'net')
				this.time.addEvent({
					delay: 20,
					callback: () => {
						if (net.x > 310) net.flipX = false
						else net.flipX = true
					},
					loop: true,
				})
				this.physics.add.overlap(net, ffRed, () => {
					ffRed.visible = redOption.visible = false
					ffBlue.visible = blueOption.visible = false
					ffYellow.visible = yellowOption.visible = false
					ffGreen.visible = greenOption.visible = false
					netMove.paused = true
					net.destroy()
					if (options[1].charAt(0) === 'T') this.score += 1
					if (this.question < this.questions.length - 1) this.speak(this.questions[++this.question])
					else{
						this.scoreNmenu = this.add.text(225, 564, 'SCORE: ' + this.score + '\n\nMENU', {
							fontSize: '32px',
						}).setDepth(1000).setInteractive()
						this.scoreNmenu.on("pointerdown", () => {window.location.reload()})
					}
				})
				this.physics.add.overlap(net, ffBlue, () => {
					ffRed.visible = redOption.visible = false
					ffBlue.visible = blueOption.visible = false
					ffYellow.visible = yellowOption.visible = false
					ffGreen.visible = greenOption.visible = false
					netMove.paused = true
					net.destroy()

					if (options[2].charAt(0) === 'T') this.score += 1
					if (this.question < this.questions.length - 1) this.speak(this.questions[++this.question])
					else
						this.add.text(200, 564, 'SCORE: ' + this.score, {
							fontSize: '32px',
						})
				})
				this.physics.add.overlap(net, ffGreen, () => {
					ffRed.visible = redOption.visible = false
					ffBlue.visible = blueOption.visible = false
					ffYellow.visible = yellowOption.visible = false
					ffGreen.visible = greenOption.visible = false
					netMove.paused = true
					net.destroy()

					if (options[3].charAt(0) === 'T') this.score += 1
					if (this.question < this.questions.length - 1) this.speak(this.questions[++this.question])
					else
						this.add.text(200, 564, 'SCORE: ' + this.score, {
							fontSize: '32px',
						})
				})
				this.physics.add.overlap(net, ffYellow, () => {
					ffRed.visible = redOption.visible = false
					ffBlue.visible = blueOption.visible = false
					ffYellow.visible = yellowOption.visible = false
					ffGreen.visible = greenOption.visible = false
					netMove.paused = true
					net.destroy()

					if (options[4].charAt(0) === 'T') this.score += 1
					if (this.question < this.questions.length - 1) this.speak(this.questions[++this.question])
					else
						this.add.text(200, 564, 'SCORE: ' + this.score, {
							fontSize: '32px',
						})
				})

				const netMove = this.time.addEvent({
					delay: 50,
					callback: () => {
						net.x = game.input.mousePointer.x
						if(game.input.mousePointer.y + Math.abs(320-game.input.mousePointer.x) > 1000)
							net.y = game.input.mousePointer.y
						else
							net.y = 1000 - Math.abs(320-game.input.mousePointer.x)
					},
					loop: true,
				})
			},
		})
	}
}
