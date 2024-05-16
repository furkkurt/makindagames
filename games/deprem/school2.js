class school2 extends Phaser.Scene{
  constructor(){
    super("school2")
  }

  create(){
    this.depth = 9999;

    const centerX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
    const centerY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

    const bg = this.add.sprite(0, 0, "classroomBG").setOrigin(0);
    bg.setScale(this.cameras.main.width/bg.width, this.cameras.main.height/bg.height);
  
    this.chair1 = this.add.sprite(0, 600, "chair").setOrigin(0).setScale(.6).setDepth(.99);
    this.chair2 = this.add.sprite(450, 600, "chair").setOrigin(0).setScale(.6).setDepth(.99);
    this.chair3 = this.add.sprite(900, 600, "chair").setOrigin(0).setScale(.6).setDepth(.99);
    this.teacher = this.physics.add.sprite(1750, 550, "teacher").setOrigin(0).setVisible(false);
    this.kid1 = this.physics.add.sprite(925, 525, "kid1").setVisible(false);
    this.kid2 = this.physics.add.sprite(475, 525, "kid2").setVisible(false);
    this.kid3 = this.physics.add.sprite(20, 525, "kid3").setVisible(false);
    this.kid1Spine = this.add.spine(1020, 850, "character").setScale(0.35).setDepth(1).setSkinByName("kid1S").play("crouch")
    this.kid2Spine = this.add.spine(570, 850, "character").setScale(0.35).setDepth(1).setSkinByName("kid2S").play("crouch")
    this.kid3Spine = this.add.spine(120, 850, "character").setScale(0.35).setDepth(1).setSkinByName("kid3S").play("crouch")
    this.desk4 = this.add.sprite(1550, 550, "desk").setOrigin(0).setScale(.6).setFlipX(true).setDepth(.99);
    this.desk1 = this.add.sprite(200, 550, "desk2").setOrigin(0).setScale(1.1).setDepth(.99);
    this.desk2 = this.add.sprite(650, 550, "desk2").setOrigin(0).setScale(1.1).setDepth(.99);
    this.desk3 = this.add.sprite(1100, 550, "desk2").setOrigin(0).setScale(1.1).setDepth(.99);
    this.teacherSpine = this.add.spine(1800, 900, "character").setScale(-0.4, 0.4).setDepth(2).setSkinByName("teacherS").play("crouch")

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
  
    this.dust = this.add.sprite(0,0,"dust").setOrigin(0).setDepth(99);
    this.dust.alpha = 1
    this.dust.setScale(this.cameras.main.width/this.dust.width);
    this.crack1 = this.add.sprite(1500,260,"crack").setScale(1.5).setOrigin(0);
    this.fluorescent = this.add.sprite(150,500,"fluorescent").setOrigin(0).setDepth(.99);
    this.rubble = this.add.sprite(1300, 900, "rubble").setOrigin(0);
    this.crack2 = this.add.sprite(570,260,"crack2").setScale(.35).setOrigin(0);
    this.crack3 = this.add.sprite(434,300,"crack2").setScale(.35).setOrigin(0);
    this.outside = this.add.sprite(1245,225,"outside").setOrigin(0).setDepth(.98);
    this.door = this.outside
    this.window = this.crack3

    this.crack1.alpha = this.rubble.alpha = .4
    this.fluorescent.alpha = .7
      
    this.crack1.alpha = this.rubble.alpha = .4
    this.fluorescent.alpha = .7
    this.time.addEvent({
      delay: 3000,
      callback:() =>{
        this.time.addEvent({
          delay: 20,
          callback:() =>{
            this.dust.alpha -= .01
          }, repeat: 100
        })
      }
    })

    this.black = this.add.sprite(0, 0, "black").setOrigin(0).setDepth(999)
    this.black.setScale(100)
    this.time.addEvent({
      delay: 1000,
      callback:() =>{
        this.time.addEvent({
          delay: 20,
          callback:() =>{
            this.black.alpha -= .01
          }, repeat: 100
        })
      }
    })
    this.time.addEvent({
      delay: 3000,
      callback:() =>{
        this.intro()
      }
    })
  }

  intro() {
    this.kid1.setDepth(99)
    this.kid2.setDepth(99)
    this.kid3.setDepth(99)
    this.teacher.setDepth(99)
    this.teacherSpine.play("idle", true)
    this.kid1Spine.play("idle", true)
    this.kid2Spine.play("idle", true)
    this.kid3Spine.play("idle", true)

    this.time.addEvent({
      delay: 1000,
      callback:() =>{
        this.physics.moveTo(this.kid1, 1200, this.kid1.y, 570)
        this.physics.moveTo(this.kid2, 1200, this.kid1.y, 570)
        this.physics.moveTo(this.kid3, 1200, this.kid1.y, 500)
        this.physics.moveTo(this.teacher, this.outside.x, this.kid1.y-200, 570)
        this.kid1Spine.play("run", true)
        this.kid2Spine.play("run", true)
        this.kid3Spine.play("run", true)
        this.teacherSpine.play("run", true) 
        this.fade();
        this.time.addEvent({
          delay: 500,
          callback:() =>{
            this.physics.moveTo(this.teacher, 1200, 0, 500)
            this.time.addEvent({
              delay: 325,
              callback:() =>{
                this.physics.moveTo(this.kid1, 1200, 0, 500)
                this.time.addEvent({
                  delay: 750,
                  callback:() =>{
                    this.physics.moveTo(this.kid2, 1200, 0, 500)
                    this.time.addEvent({
                      delay: 1250,
                      callback:() =>{
                        this.physics.moveTo(this.kid3, 1200, 0, 400)
                        this.time.addEvent({
                          delay: 1000,
                          callback:() =>{
                            this.time.addEvent({
                              delay: 20,
                              callback:() =>{
                                this.black.alpha += .01
                                this.time.addEvent({
                                  delay: 2000,
                                  callback:() =>{
                                    this.scene.start("school3")
                                  }
                                })
                              }, repeat: 100
                            })
                          }
                        })
                      }
                    })
                  }
                })
              }
            })
          }
        })
      }
    })
  }

  fade() {
    this.time.addEvent({
      delay: 1000,
      callback:() =>{
        this.time.addEvent({
          delay: 20,
          callback:() =>{
            this.teacherSpine.alpha -= .05
          }, repeat: 20
        })
      }
    })
    this.time.addEvent({
      delay: 1500,
      callback:() =>{
        this.time.addEvent({
          delay: 20,
          callback:() =>{
            this.kid1Spine.alpha -= .05
          }, repeat: 20
        })
      }
    })
    this.time.addEvent({
      delay: 2000,
      callback:() =>{
        this.time.addEvent({
          delay: 20,
          callback:() =>{
            this.kid2Spine.alpha -= .05
          }, repeat: 20
        })
      }
    })
    this.time.addEvent({
      delay: 3500,
      callback:() =>{
        this.time.addEvent({
          delay: 20,
          callback:() =>{
            this.kid3Spine.alpha -= .05
          }, repeat: 20
        })
      }
    })
  }

  update() {
    this.teacherSpine.x = this.teacher.x - this.differTeacherX
    this.teacherSpine.y = this.teacher.y - this.differTeacherY
    this.kid1Spine.x = this.kid1.x - this.differKid1X
    this.kid1Spine.y = this.kid1.y - this.differKid1Y
    this.kid2Spine.x = this.kid2.x - this.differKid2X
    this.kid2Spine.y = this.kid2.y - this.differKid2Y
    this.kid3Spine.x = this.kid3.x - this.differKid3X
    this.kid3Spine.y = this.kid3.y - this.differKid3Y

    if (this.teacher.y > this.centerY)
      this.teacherSpine.setDepth(1)
    else if (this.teacher.y < this.centerY)
      this.teacherSpine.setDepth(.99)
    else
      this.teacherSpine.setDepth(1)

    if (this.kid1.y > this.centerY)
      this.kid1Spine.setDepth(1)
    else if (this.kid1.y < this.centerY)
      this.kid1Spine.setDepth(.99)
    else
      this.kid1Spine.setDepth(1)

    if (this.kid2.y > this.centerY)
      this.kid2Spine.setDepth(1)
    else if (this.kid2.y < this.centerY)
      this.kid2Spine.setDepth(.99)
    else
      this.kid2Spine.setDepth(1)

    if (this.kid3.y > this.centerY)
      this.kid3Spine.setDepth(1)
    else if (this.kid3.y < this.centerY)
      this.kid3Spine.setDepth(.99)
    else
      this.kid3Spine.setDepth(1)

    if (this.kid1.y > 850)
      this.kid1Spine.depth = 98
    if (this.kid2.y > 850)
      this.kid2Spine.depth = 98
    if (this.kid3.y > 850)
      this.kid3Spine.depth = 98
    if (this.teacher.y > 850)
      this.teacherSpine.depth = 98

  }
}
