class menu extends Phaser.Scene{
  constructor(){
    super("menu")
  }

  create(){
    const centerX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
    const centerY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
    
    const bg = this.add.sprite(0, 0, "menuBg").setOrigin(0);
    bg.setScale(this.cameras.main.width/bg.width, this.cameras.main.height/bg.height);

    const schoolBut = this.add.sprite(centerX, centerY-200, "iconSchool").setScale(2)
    schoolBut.setInteractive();
    schoolBut.on("pointerdown", () => {this.scene.start("school")})

    const leftBut = this.add.sprite(centerX-250, centerY-200, "left")
    const rightBut = this.add.sprite(centerX+250, centerY-200, "left").flipX = true
  }

  update(){
  }
}
