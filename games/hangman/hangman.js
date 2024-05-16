class hangman extends Phaser.Scene {
	constructor() {
		super('hangman')
	}
	
	init(data) {
		this.lives = data.lives
		this.word = data.word
	}
	create() {
		this.bg = this.add.image(0, 0, 'bg')
		this.bg.scaleX = 1.182
		this.bg.scaleY = 1.065
		this.hearth0 = this.add.image(20, 450, 'hearth').setOrigin(0).setScale(1.5).setVisible(false)
		this.hearth1 = this.add.image(80, 450, 'hearth').setOrigin(0).setScale(1.5).setVisible(false)
		this.hearth2 = this.add.image(20, 500, 'hearth').setOrigin(0).setScale(1.5).setVisible(false)
		this.hearth3 = this.add.image(80, 500, 'hearth').setOrigin(0).setScale(1.5).setVisible(false)
		this.hearth4 = this.add.image(20, 550, 'hearth').setOrigin(0).setScale(1.5).setVisible(false)
		this.hearth5 = this.add.image(80, 550, 'hearth').setOrigin(0).setScale(1.5).setVisible(false)
		this.hearths = [this.hearth0, this.hearth1, this.hearth2, this.hearth3, this.hearth4, this.hearth5]
		this.nextLetter = 0
		//set up the question
		this.questions = [['FROG', 'frog'], ['HORSE', 'horse'], ['TOMATO', 'tomato'], ['ORANGE', 'orange']]
		this.question = this.questions[Math.floor(Math.random() * this.questions.length)]
		this.image = this.add.image(800,425,this.question[1]).setOrigin(0)
		this.image.setScale(200/this.image.width)
		this.answer = this.question[0]
		this.underscores = []
		this.letters = []
		this.lettersText = []
		if(this.lives == undefined)
			this.lives = 6
		for (let i=0; i<this.lives; i++){
			this.hearths[i].setVisible(true)
		}
		if(this.word == undefined)
			this.word = 1
		this.alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
		for(let i=0; i<this.answer.length; i++){
			this.underscores.push(this.add.text(400+(i*35), 550, '_', {fontSize: '48px'}).setVisible(false))
			this.letters.push(this.add.text(400+(i*35), 530, this.answer.charAt(i), {fontSize: '48px'}).setVisible(false))
			this.lettersText.push(this.letters[i].text)
			this.alphabet.push(this.letters[i].text, this.letters[i].text, this.letters[i].text, this.letters[i].text, this.letters[i].text)
		}

		//set up fireflies
		this.flies = []
		this.ffKeys = ["ffRed", "ffBlue", "ffYellow", "ffGreen"]
		this.time.addEvent({
			delay: 500,
			callback:() =>{
				let ff1 = [this.physics.add.sprite(Math.floor(Math.random()*1136), -1*Math.floor(Math.random()*1000), this.ffKeys[Math.floor(Math.random()*4)]).setVelocityY(100), this.add.text(0,0,this.alphabet[Math.floor(Math.random() * this.alphabet.length)], {color: "black", fontSize:"32px"}).setOrigin(0)]
				for (let i=0; i<this.flies.length; i++){
					this.physics.add.overlap(ff1, this.flies[i], (ff1, ff2) => {
						if(Math.abs(ff1.x - ff2.x) < 50)
							ff1.x = Math.floor(Math.random()*1136)
					})
				}
				this.flies.push(ff1)
				this.physics.add.overlap(this.bullet, ff1[0], () => {
					ff1[0].y = 399
					ff1[0].setVisible(false)
					ff1[1].setVisible(false)
					this.checkLetter(ff1[1].text)
					this.bullet.body.reset()
					this.bullet.x = this.bullet.y = 500
				})
			}, loop: true
		})

		//shoot
		this.bullet = this.physics.add.sprite(500,500,"bullet").setScale(2)
		this.overlay = this.physics.add.sprite(0,0,"empty").setScale(1136).setOrigin(0).setDepth(999).setInteractive()
		this.overlay.on('pointerdown', () => {
			this.physics.moveTo(this.bullet, game.input.activePointer.x, game.input.activePointer.y, 1500)
		})
	}

	checkLetter(letter){
		if(this.answer[this.nextLetter] == letter){
			this.letters[this.nextLetter].setVisible(true)
			this.underscores[this.nextLetter].setVisible(true)
			this.nextLetter++;
			if (this.nextLetter == this.answer.length) {
				if(this.word<3) {
					this.word++
					this.scene.start("hangman", {lives: this.lives, word: this.word})	
				}
				else {
					this.scene.start("menu")	
				}
			}
		}
		else {
			this.lives--
			this.hearths[this.lives].setVisible(false)
			if(this.lives<=0)
				window.location.reload()
		}
	}

	update() {
		if((this.bullet.y < 0 || this.bullet.x < 0) || (this.bullet.y > 640 || this.bullet.x > 1136)){
			this.bullet.body.reset()
			this.bullet.x = this.bullet.y = 500
		}
		for (let i=0; i<this.flies.length; i++){
			this.flies[i][1].x = this.flies[i][0].x-10
			this.flies[i][1].y = this.flies[i][0].y-15
			if(this.flies[i][0].y>400){
				this.flies[i][0].destroy()
				this.flies[i][1].destroy()
				const firstHalf = this.flies.slice(0, i)
				const secondHalf = this.flies.slice(i+1);
				this.flies = firstHalf.concat(secondHalf);
			}
		}
	}
}
