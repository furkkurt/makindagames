class street extends Phaser.Scene{
  constructor(){
    super("street")
  }

  create(){
    this.depth = 9999;
    const centerX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
    const centerY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

    const street = this.add.sprite(centerX,centerY,"road").setScale(2);
    this.character = this.physics.add.sprite(centerX, centerY+200, "character1");
    this.character.body.setSize(16,16,true)
    this.character.setScale(7);
    this.character.play("characterRun");
    this.props = ["tree1", "tree2", "tree3", "tree4", "tree5"];

    this.characterPositions = [centerX-200, centerX, centerX+200];
    this.characterPos = 1;
    this.run();
    this.invisLeftBut = this.add.sprite(0,0).setScale(30,40).setOrigin(0).setInteractive();
    this.invisRightBut = this.add.sprite(centerX,0).setScale(30,40).setOrigin(0).setInteractive();
    this.invisLeftBut.on("pointerdown", () => {
      if(this.characterPos>0)
        this.character.x = this.characterPositions[--this.characterPos];
    });
    this.invisRightBut.on("pointerdown", () => {
      if(this.characterPos<2)
        this.character.x = this.characterPositions[++this.characterPos];
    });
  }

  update(){
  }
  
  run() {
    this.time.addEvent({
      delay: 3000,
      callback:() =>{
        this.addRandProp();
        this.addRandProp();
        this.addRandProp();
        this.propFall();
      },loop: true
    })
  }

  propFall() {
    this.sides = [1, -1];
    this.positions = [150,1920-150];
    this.rand = Math.floor(Math.random()*2)
    this.prop = this.physics.add.sprite(this.positions[this.rand], 700, this.props[Math.floor(Math.random()*this.props.length)]).setScale(1.75).setDepth(9999)
    this.time.addEvent({
      delay: 20,
      callback:() =>{
        this.prop.rotation += .03*this.sides[this.rand]
        this.prop.x += 6*this.sides[this.rand]
        this.prop.y += 5
      },repeat: 50
    });
    this.time.addEvent({
      delay: 2000,
      callback:() =>{
        this.prop.destroy();
      }
    })

    this.physics.add.overlap(this.prop, this.character, () => {
      this.scene.start("menu");
    })
  }

  addRandProp() {
    this.positions = [0, 150, 300, 400, 450, 500, 550];
    let tree1 = this.physics.add.sprite(this.positions[Math.floor(Math.random()*this.positions.length)],-200,this.props[Math.floor(Math.random()*this.props.length)]).setDepth(this.depth--);
    let tree2 = this.physics.add.sprite(1920-this.positions[Math.floor(Math.random()*this.positions.length)],-200,this.props[Math.floor(Math.random()*this.props.length)]).setDepth(this.depth--);
    //tree1.setVelocity(-110,200);
    this.physics.moveTo(tree1, tree1.x-700, 1000, 200)
    this.physics.moveTo(tree2, tree2.x+700, 1000, 200)
    this.time.addEvent({
      delay: 50,
      callback:() =>{
        tree1.scaleX += .005;
        tree1.scaleY += .005;
        tree2.scaleX += .005;
        tree2.scaleY += .005;
      }, repeat: 100
    })
    this.time.addEvent({
      delay: 10000,
      callback:() =>{
        tree1.destroy();
        tree2.destroy();
      }
    })
  }
}
