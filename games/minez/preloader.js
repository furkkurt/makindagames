class preloader extends Phaser.Scene {
  constructor() {
    super("preloader");
  };
  preload(){
    this.load.atlas("player", "./assets/player.png", "./assets/player.json");
    this.load.image("tileset", "./assets/tile.png");
    this.load.tilemapTiledJSON("map", "./assets/map.json");
	};
	create(){
    this.loading = this.add.text(this.cameras.main.centerX,this.cameras.main.centerY*1.5,"LOADING", { fontFamily: "AGoblinAppears", color: "black", fontSize:"32px" });
    this.time.addEvent({
      delay: 250,
      callback:() =>{
        if(this.loading.text == "LOADING")
          this.loading.text="LOADING.";
        else if(this.loading.text == "LOADING.")
          this.loading.text="LOADING..";
        else if(this.loading.text == "LOADING..")
          this.loading.text="LOADING...";
        else
          this.loading.text="LOADING";
      }, loop:true
    })
    
    this.anims.create({
      key: "playerIdle",
      frameRate: 0,
      frames: [{key:"player", frame:"0"},],
      repeat: 0
    });
    this.anims.create({
      key: "playerRun",
      frameRate: 6,
      frames: [{key:"player", frame:"1"},{key:"player", frame:"2"},{key:"player", frame:"3"},{key:"player", frame:"4"},{key:"player", frame:"5"},{key:"player", frame:"6"}],
      repeat: -1
    });
    this.anims.create({
      key: "playerSprint",
      frameRate: 8,
      frames: [{key:"player", frame:"1"},{key:"player", frame:"2"},{key:"player", frame:"3"},{key:"player", frame:"4"},{key:"player", frame:"5"},{key:"player", frame:"6"}],
      repeat: -1
    }); 
    this.anims.create({
      key: "playerIdleUp",
      frameRate: 0,
      frames: [{key:"player", frame:"7"}],
      repeat: 0
    });
    this.anims.create({
      key: "playerRunUp",
      frameRate: 6,
      frames: [{key:"player", frame:"8"},{key:"player", frame:"9"},{key:"player", frame:"10"},{key:"player", frame:"11"}],
      repeat: -1
    });
    this.anims.create({
      key: "playerSprintUp",
      frameRate: 10,
      frames: [{key:"player", frame:"8"},{key:"player", frame:"9"},{key:"player", frame:"10"},{key:"player", frame:"11"}],
      repeat: -1
    });
    this.anims.create({
      key: "playerIdleDown",
      frameRate: 0,
      frames: [{key:"player", frame:"12"}],
      repeat: 0
    });
    this.anims.create({
      key: "playerRunDown",
      frameRate: 6,
      frames: [{key:"player", frame:"13"},{key:"player", frame:"14"},{key:"player", frame:"15"},{key:"player", frame:"16"}],
      repeat: -1
    });
    this.anims.create({
      key: "playerSprintDown",
      frameRate: 10,
      frames: [{key:"player", frame:"13"},{key:"player", frame:"14"},{key:"player", frame:"15"},{key:"player", frame:"16"}],
      repeat: -1
    });

    this.player = this.physics.add.sprite(100, this.cameras.main.centerY, "player").setScale(3);
    this.time.addEvent({
      delay: 2000,
      callback:() =>{
        this.player.play("playerRun");
        this.player.setVelocityX(150);
      }
    });

    this.scene.start("map");

	}
}
