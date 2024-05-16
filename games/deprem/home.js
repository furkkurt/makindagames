class school extends Phaser.Scene{
  constructor(){
    super("school")
  }

  create(){
    this.depth = 9999;

    this.centerX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
    this.centerY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

    const bg = this.add.sprite(0, 0, "roomBG").setOrigin(0);
    bg.setScale(this.cameras.main.width/bg.width, this.cameras.main.height/bg.height);

    this.kid1 = this.physics.add.sprite(925, 525, "kid1").setVisible(false);
    this.kid1Spine = this.add.spine(1020, 720, "character").setScale(0.35).setDepth(1).setSkinByName("kid1N").play("sit")

    this.differKid1X = this.kid1.x - this.kid1Spine.x
    this.differKid1Y = this.kid1.y - this.kid1Spine.y

    this.physics.add.existing(this.kid1)
    
  }

  intro() {
  }

  start() {
  }

  pick(pos) {
  }

  finish() {
  }

  update() {
    this.kid1Spine.x = this.kid1.x - this.differKid1X
    this.kid1Spine.y = this.kid1.y - this.differKid1Y
  }
}
