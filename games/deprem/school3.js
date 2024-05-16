class school3 extends Phaser.Scene{
  constructor(){
    super("school3")
  }

  create(){
    this.depth = 9999;

    const centerX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
    const centerY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

    const bg = this.add.sprite(0, 0, "yard").setOrigin(0);
    bg.setScale(this.cameras.main.width/bg.width, this.cameras.main.height/bg.height);

    this.teacher = this.physics.add.sprite(125, 680, "teacher").setOrigin(0).setVisible(false);
    this.kid1 = this.physics.add.sprite(50, 680, "kid1").setVisible(false);
    this.kid2 = this.physics.add.sprite(-25, 680, "kid2").setVisible(false);
    this.kid3 = this.physics.add.sprite(-100, 700, "kid3").setVisible(false);
    this.kid1Spine = this.add.spine(50, 680, "character").setScale(0.25).setDepth(1).setSkinByName("kid1S").play("idle", true)
    this.kid2Spine = this.add.spine(-25, 680, "character").setScale(0.25).setDepth(1).setSkinByName("kid2S").play("idle", true)
    this.kid3Spine = this.add.spine(-100, 700, "character").setScale(0.25).setDepth(1).setSkinByName("kid3S").play("idle", true)
    this.teacherSpine = this.add.spine(125, 680, "character").setScale(0.3).setDepth(1).setSkinByName("teacherS").play("idle", true)

    this.differTeacherX = this.teacher.x - this.teacherSpine.x
    this.differTeacherY = this.teacher.y - this.teacherSpine.y
    this.differKid1X = this.kid1.x - this.kid1Spine.x
    this.differKid1Y = this.kid1.y - this.kid1Spine.y
    this.differKid2X = this.kid2.x - this.kid2Spine.x
    this.differKid2Y = this.kid2.y - this.kid2Spine.y
    this.differKid3X = this.kid3.x - this.kid3Spine.x
    this.differKid3Y = this.kid3.y - this.kid3Spine.y

    this.score = 3;
    this.physics.add.existing(this.kid1)
    this.physics.add.existing(this.kid2)
    this.physics.add.existing(this.kid3)
    this.physics.add.existing(this.teacher)
    this.teacher.body.setGravity(0)
 
    this.rubble = this.add.sprite(1275, 450, "rubble1").setOrigin(0).setScale(2).setDepth(0.99);
    this.rubble = this.add.sprite(325, 700, "rubble2").setOrigin(0).setScale(2).setDepth(1.01);
    this.rubble = this.add.sprite(1300, 690, "rubble3").setOrigin(0).setScale(2).setDepth(1.01);
    this.rubble = this.add.sprite(900, 400, "rubble4").setOrigin(0).setScale(2).setDepth(0.99);

    this.collisionBox1 = this.physics.add.sprite(350, 875, "black").setOrigin(0).setScale(11).setVisible(false).setImmovable()
    this.collisionBox2 = this.physics.add.sprite(950, 750, "black").setOrigin(0).setScale(5).setVisible(false).setImmovable()
    this.collisionBox3 = this.physics.add.sprite(1350, 525, "black").setOrigin(0).setScale(10).setVisible(false).setImmovable()
    this.collisionBox4 = this.physics.add.sprite(1350, 975, "black").setOrigin(0).setScale(10).setVisible(false).setImmovable()
    this.collisionBox5 = this.physics.add.sprite(0, 0, "black").setOrigin(0).setScale(60, 20).setVisible(false).setImmovable()
    this.collisionBox6 = this.physics.add.sprite(0, 1100, "black").setOrigin(0).setScale(60, 20).setVisible(false).setImmovable()
    this.collisionBox7 = this.physics.add.sprite(-100, 0, "black").setOrigin(0).setScale(5, 50).setVisible(false).setImmovable()
    this.collisionBox8 = this.physics.add.sprite(1800, 0, "black").setOrigin(0).setScale(5, 50).setVisible(false).setImmovable()

    this.physics.add.collider(this.teacher, this.collisionBox1)
    this.physics.add.collider(this.teacher, this.collisionBox2)
    this.physics.add.collider(this.teacher, this.collisionBox3)
    this.physics.add.collider(this.teacher, this.collisionBox4)
    this.physics.add.collider(this.teacher, this.collisionBox5)
    this.physics.add.collider(this.teacher, this.collisionBox6)
    this.physics.add.collider(this.teacher, this.collisionBox7)
    this.physics.add.collider(this.teacher, this.collisionBox8, () => {this.finish()})

    this.interactiveBox = this.add.sprite(0,0,"black").setOrigin(0).setScale(100).setInteractive();
    this.interactiveBox.alpha = .01;
    this.interactiveBox.on("pointerdown", () => {this.move()})
    this.interactiveBox.on("pointerup", () => {this.stop()})

    this.black = this.add.sprite(0, 0, "black").setOrigin(0).setDepth(999).setScale(100)
    this.time.addEvent({
      delay: 20,
      callback:() =>{
        this.black.alpha -= .01
      }, repeat: 100
    })

    this.time.addEvent({
      delay: 3000,
      callback:() =>{
        this.intro()
      }
    })
  }

  intro() {
  } 

  move() {
    this.physics.moveTo(this.teacher, game.input.activePointer.x, game.input.activePointer.y, 300)
    this.teacherSpine.play("run", true)
    this.kid1Spine.play("run", true)
    this.kid2Spine.play("run", true)
    this.kid3Spine.play("run", true)
  }

  stop() {
    this.teacher.setVelocity(0)
    this.kid1.setVelocity(0)
    this.kid2.setVelocity(0)
    this.kid3.setVelocity(0)
    this.teacherSpine.play("idle")
    this.kid1Spine.play("idle")
    this.kid2Spine.play("idle")
    this.kid3Spine.play("idle")
  }

  finish() {
    this.teacher.setVelocityX(200)
    this.time.addEvent({
      delay: 20,
      callback:() =>{
        this.black.alpha += .01
      }, repeat: 100
    })
    this.time.addEvent({
      delay: 1000,
      callback:() =>{
        this.scene.start("school4")
      }
    })
  }

  update() {
    this.kid1.y = this.teacher.y 
    this.kid1.x = this.teacher.x -75
    this.kid2.y = this.teacher.y 
    this.kid2.x = this.kid1.x -75
    this.kid3.y = this.teacher.y +20
    this.kid3.x = this.kid2.x -75
    this.teacherSpine.x = this.teacher.x - this.differTeacherX
    this.teacherSpine.y = this.teacher.y - this.differTeacherY
    this.kid1Spine.x = this.kid1.x - this.differKid1X
    this.kid1Spine.y = this.kid1.y - this.differKid1Y
    this.kid2Spine.x = this.kid2.x - this.differKid2X
    this.kid2Spine.y = this.kid2.y - this.differKid2Y
    this.kid3Spine.x = this.kid3.x - this.differKid3X
    this.kid3Spine.y = this.kid3.y - this.differKid3Y
  }
}
