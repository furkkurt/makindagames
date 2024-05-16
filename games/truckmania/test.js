class test extends Phaser.Scene {
  constructor() {
    super("test");
  }
  preload() {
	}

  create() {
    console.log("test");

    this.map = this.make.tilemap({
      key: "test",
      tileWidth: 1400,
      tileHeight: 1400
    });

    this.tileset = this.map.addTilesetImage("tileset", "tile");
    this.roadLayer = this.map.createLayer("roadLayer", this.tileset);
    this.cameras.main.setZoom(.5);

    this.front = this.physics.add.sprite(50, 180, "frontRed").setAngle(-90).setScale(.3);
    this.back = this.physics.add.sprite(this.front.x - 20, this.front.y, "backDefault").setAngle(-90).setScale(this.front.scale);

    this.front.body.setSize(this.front.height, this.front.width);
    this.back.body.setSize(this.back.height, this.back.width*2);

    this.cameras.main.setZoom(5);
    this.cameras.main.startFollow(this.front);

    this.input.keyboard.on("keydown-W", this.gas.bind(this));
    this.input.keyboard.on("keyup-W", this.gasRelease.bind(this));
    this.input.keyboard.on("keydown-A", this.left.bind(this));
    this.input.keyboard.on("keyup-A", this.leftRelease.bind(this));
    this.input.keyboard.on("keydown-D", this.right.bind(this));
    this.input.keyboard.on("keyup-D", this.rightRelease.bind(this));
    this.input.keyboard.on("keydown-S", this.break.bind(this));
    this.input.keyboard.on("keyup-S", this.breakRelease.bind(this));

    this.leftTimeEvent = this.time.addEvent({
      delay: 20,
      callback:() =>{
          this.front.angle -= 1;
      }, loop: true, paused: true
    })

    this.rightTimeEvent= this.time.addEvent({
      delay: 20,
      callback:() =>{
          this.front.angle += 1;
      }, loop: true, paused: true
    })

    this.gasTimeEvent = this.time.addEvent({
      delay: 20,
      callback:() =>{
        //if(this.rightTimeEvent.paused && this.leftTimeEvent.paused) {
          if (this.front.body.velocity.x + this.front.body.velocity.y < 50 && this.front.body.velocity.x + this.front.body.velocity.y > -50) {
            if (this.front.body.rotation < 0) {
              this.front.body.velocity.x += 1.8 + this.front.angle/100
              this.front.body.velocity.y += .9 + this.front.angle/100
            }
            else if(this.front.body.rotation > 90 && this.front.body.rotation < 180){
              this.front.body.velocity.x += -(1.8 + this.front.angle/100)
              this.front.body.velocity.y += -(.9 + this.front.angle/100)
            }
            else {
              this.front.body.velocity.x += -(1.8 + this.front.angle/100)
              this.front.body.velocity.y += (.9 + this.front.angle/100)
            }
          }
        //}
      }, loop: true, paused: true
    })

    this.breakTimeEvent = this.time.addEvent({
      delay: 20,
      callback:() =>{
        if (this.front.body.velocity.x > 0)
          this.front.body.velocity.x -= 1;
        if (this.front.body.velocity.y < 0)
          this.front.body.velocity.y += 1;
        if (this.front.body.velocity.x < 0)
          this.front.body.velocity.x += 1;
        if (this.front.body.velocity.y > 0)
          this.front.body.velocity.y -= 1;
      }, loop: true, paused: true
    })
  }

  gas() {
    this.gasTimeEvent.paused = false;  
  }

  gasRelease() {
    this.gasTimeEvent.paused = true;  
  }

  left() {
    this.leftTimeEvent.paused = false;
  }

  leftRelease() {
    this.leftTimeEvent.paused = true;
  }
  
  right() {
    this.rightTimeEvent.paused = false;
  }

  rightRelease() {
    this.rightTimeEvent.paused = true;
  }

  break() {
    this.breakTimeEvent.paused = false;
  }

  breakRelease() {
    this.breakTimeEvent.paused = true;
  }

  update() {
    //lose speed
    if (this.gasTimeEvent.paused && this.front.body.velocity.x >= 0)
      this.front.body.velocity.x -= 1;
    if (this.gasTimeEvent.paused && this.front.body.velocity.y <= 0)
      this.front.body.velocity.y += 1;
    if (this.gasTimeEvent.paused && this.front.body.velocity.x <= 0)
      this.front.body.velocity.x += 1;
    if (this.gasTimeEvent.paused && this.front.body.velocity.y >= 0)
      this.front.body.velocity.y -= 1;

    this.back.angle = this.front.angle;

    if (this.front.angle < -90 && this.front.angle > -179) {
      this.back.x = this.front.x - (this.front.angle/6) - 30;
      this.back.y = this.front.y + (-this.front.angle/6) - 15;
    }
    else if (this.front.angle < 0 && this.front.angle > -89) {
      this.back.x = this.front.x + (this.front.angle/6);
      this.back.y = this.front.y + (-this.front.angle/4) - 20;
    }
    else if (this.front.angle > 0 && this.front.angle < 89) {
      this.back.x = this.front.x - (-this.front.angle/6);
      this.back.y = this.front.y + (this.front.angle/6) - 15;
    }
    else if (this.front.angle > 90 && this.front.angle < 179) {
      this.back.x = this.front.x + (-this.front.angle/6) + 35;
      this.back.y = this.front.y + (this.front.angle/4) - 25;
    }
    else 
      this.back.x = this.front.x - 20;
  }
}
