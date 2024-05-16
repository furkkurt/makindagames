class school4 extends Phaser.Scene{
  constructor(){
    super("school4")
  }

  create(){
    this.depth = 9999;

    const centerX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
    const centerY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

    const bg = this.add.sprite(0, 0, "emptyYard").setOrigin(0);
    bg.setScale(this.cameras.main.width/bg.width, this.cameras.main.height/bg.height);

    this.teacher = this.physics.add.sprite(125, 680, "teacher").setOrigin(0).setVisible(false);
    this.kid1 = this.physics.add.sprite(50, 680, "kid1").setVisible(false);
    this.kid2 = this.physics.add.sprite(-25, 680, "kid2").setVisible(false);
    this.kid3 = this.physics.add.sprite(-100, 700, "kid3").setVisible(false);
    this.kid1Spine = this.add.spine(50, 680, "character").setScale(0.25).setDepth(1).setSkinByName("kid1S").play("run", true)
    this.kid2Spine = this.add.spine(-25, 680, "character").setScale(0.25).setDepth(1).setSkinByName("kid2S").play("run", true)
    this.kid3Spine = this.add.spine(-100, 700, "character").setScale(0.25).setDepth(1).setSkinByName("kid3S").play("run", true)
    this.teacherSpine = this.add.spine(125, 680, "character").setScale(0.3).setDepth(2).setSkinByName("teacherS").play("run", true)

    this.differTeacherX = this.teacher.x - this.teacherSpine.x
    this.differTeacherY = this.teacher.y - this.teacherSpine.y
    this.differKid1X = this.kid1.x - this.kid1Spine.x
    this.differKid1Y = this.kid1.y - this.kid1Spine.y
    this.differKid2X = this.kid2.x - this.kid2Spine.x
    this.differKid2Y = this.kid2.y - this.kid2Spine.y
    this.differKid3X = this.kid3.x - this.kid3Spine.x
    this.differKid3Y = this.kid3.y - this.kid3Spine.y

    this.teacher.setVelocityX(200)

    let black = this.add.sprite(0, 0, "black").setOrigin(0).setDepth(999).setScale(100)
    this.time.addEvent({
      delay: 20,
      callback:() =>{
        black.alpha -= .01
      }, repeat: 100
    })

    this.time.addEvent({
      delay: 5000,
      callback:() =>{
        this.intro()
      }
    })
  }

  intro() {
    this.teacher.setVelocity(0)
    this.kid1Spine.play("idle")
    this.kid2Spine.play("idle")
    this.kid3Spine.play("idle")
    this.teacherSpine.play("idle")
    this.teacherSpine.setScale(-.3, .3)
    this.kid1Spine.setSkinByName("kid1N").play("idle", true);
    this.kid2Spine.setSkinByName("kid2N").play("idle", true);
    this.kid3Spine.setSkinByName("kid3N").play("idle", true);
    this.teacherSpine.setSkinByName("teacherN").play("idle", true)
    this.time.addEvent({
      delay: 1500,
      callback:() =>{
        this.kid1Spine.setSkinByName("kid1H");
        this.kid2Spine.setSkinByName("kid2H");
        this.kid3Spine.setSkinByName("kid3H");
        this.teacherSpine.setSkinByName("teacherH")
      }
    })
  } 

  update() {
    this.kid1.y = this.teacher.y 
    this.kid1.x = this.teacher.x -300
    this.kid2.y = this.teacher.y 
    this.kid2.x = this.kid1.x -150
    this.kid3.y = this.teacher.y +20
    this.kid3.x = this.kid2.x -150
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
