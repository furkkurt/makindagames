class map extends Phaser.Scene{
  constructor(){
    super("map")
  }
  create(){
    //MAP, TILESET AND LAYERS
		const map = this.make.tilemap({
      key: "map",
      tileWidth: 16,
      tileHeight: 16
    });
    const tileset = map.addTilesetImage("tileset", "tileset");
    const groundLayer = map.createLayer("groundLayer", tileset);

    //PLAYER
    this.player = this.physics.add.sprite(1000, 1000, "player");
    this.player.speed = 2;

    //CAMERA
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setZoom(3);

    //CONTROLS
    this.input.on("wheel", function(pointer, gameObjects, deltaX, deltaY, deltaZ){
      console.log(this.cameras.main.zoom);
      if(this.cameras.main.zoom > 1)
        this.cameras.main.zoom -= deltaX * 0.01;
      if(this.cameras.main.zoom < 5)
        this.cameras.main.zoom -= deltaY * 0.01;
      if(this.cameras.main.zoom > 5)
        this.cameras.main.zoom = 4.9;
      if(this.cameras.main.zoom < 1)
        this.cameras.main.zoom = 1.1;
    });

    this.rightPressed; this.leftPressed; this.upPressed; this.downPressed; this.sprinting;
    this.rightPressed = this.leftPressed = this.upPressed = this.downPressed = this.sprinting = false;

    this.input.keyboard.on("keydown-W", this.up.bind(this));
    this.input.keyboard.on("keyup-W", this.upR.bind(this));
    this.input.keyboard.on("keydown-A", this.left.bind(this));
    this.input.keyboard.on("keyup-A", this.leftR.bind(this));
    this.input.keyboard.on("keydown-S", this.down.bind(this));
    this.input.keyboard.on("keyup-S", this.downR.bind(this));
    this.input.keyboard.on("keydown-D", this.right.bind(this));
    this.input.keyboard.on("keyup-D", this.rightR.bind(this));
    
    this.input.keyboard.on("keydown-SHIFT", this.sprint.bind(this));
    this.input.keyboard.on("keyup-SHIFT", this.sprintR.bind(this));

    this.time.addEvent({
      delay: 250,
      callback:() =>{
        console.log("W: "+this.upPressed);
        console.log("A: "+this.leftPressed);
        console.log("S: "+this.downPressed);
        console.log("D: "+this.rightPressed);
        console.log("Sprint: "+this.sprinting);
      }, loop: true
    })
  };

  up(){
    if(!this.upPressed){
      this.upPressed = true; 
      this.player.play("playerRunUp")
    }
  };
  upR(){
    this.upPressed = false; 
    if(this.player.body.velocity.x == this.player.body.velocity.y == 0){
      this.player.play("playerIdleUp")
    }
  };
  down(){
    if(!this.downPressed){
      this.downPressed = true; 
      this.player.play("playerRunDown")
    }
  };
  downR(){
    this.downPressed = false; 
    if(this.player.body.velocity.x == this.player.body.velocity.y == 0){
      this.player.play("playerIdleDown");
    }
  };
  left(){
    this.player.flipX=true;
    if(!this.leftPressed){
      this.leftPressed = true; 
      this.player.play("playerRun")
    }
  };
  leftR(){
    this.leftPressed = false; 
    if(this.player.body.velocity.x == this.player.body.velocity.y == 0){
      this.player.play("playerIdle");
    }
  };
  right(){
    this.player.flipX=false;
    if(!this.rightPressed){
      this.rightPressed = true; 
      this.player.play("playerRun");
    }
  };
  rightR(){
    this.rightPressed = false; 
    if(this.player.body.velocity.x == this.player.body.velocity.y == 0){
      this.player.play("playerIdle");
    }
  };
  sprint(){
    if(!this.sprinting && (this.player.body.velocity.x!=0 || this.player.body.velocity.y!=0)){
      if(this.upPressed)
        this.player.play("playerSprintUp");
      else if(this.downPressed)
        this.player.play("playerSprintDown");
      else
        this.player.play("playerSprint");
      this.sprinting = true;
    }
  };
  sprintR(){
    if(this.sprinting && (this.player.body.velocity.x!=0 || this.player.body.velocity.y!=0)){
      if(this.upPressed)
        this.player.play("playerRunUp");
      else if(this.downPressed)
        this.player.play("playerRunDown");
      else
        this.player.play("playerRun");
      this.sprinting = false; 
    }
  };

  update(){
    if(this.sprinting)
      this.player.speed = 2;
    else
      this.player.speed = 1;

    if(this.upPressed)
      this.player.setVelocityY(-40*this.player.speed);
    else if(this.downPressed)
      this.player.setVelocityY(40*this.player.speed);
    else
      this.player.setVelocityY(0);

    if(this.leftPressed)
      this.player.setVelocityX(-40*this.player.speed);
    else if(this.rightPressed)
      this.player.setVelocityX(40*this.player.speed);
    else
      this.player.setVelocityX(0);
  }
}
