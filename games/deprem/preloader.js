class preloader extends Phaser.Scene {
  constructor() {
    super("boot");
  };
  preload(){
    this.load.image("desk", "assets/desk.png");
    this.load.image("desk2", "assets/desk2.png");
    this.load.image("chair", "assets/chair.png");
    this.load.image("circle", "assets/circle.png");
    this.load.atlas("kid1", "assets/kid1.png", "assets/kid1.json");
    this.load.atlas("kid2", "assets/kid2.png", "assets/kid2.json");
    this.load.atlas("kid3", "assets/kid3.png", "assets/kid3.json");
    this.load.atlas("teacher", "assets/teacher.png", "assets/teacher.json");
    this.load.image("classroomBG", "assets/classroom4.png");
    this.load.image("rubble1", "assets/rubble1.png");
    this.load.image("rubble2", "assets/rubble2.png");
    this.load.image("rubble3", "assets/rubble3.png");
    this.load.image("rubble4", "assets/rubble4.png");
    this.load.image("fluorescent", "assets/fluorescent.png");
    this.load.image("crack", "assets/crack.png");
    this.load.image("dust", "assets/dust.png");
    this.load.image("crack2", "assets/crack2.png");
    this.load.image("outside", "assets/outside.png");
    this.load.image("plank", "assets/plank.png")
    this.load.image("glass", "assets/glassB.png")
    this.load.image("black", "assets/black.png")
    this.load.image("yard", "assets/yard.jpg")
    this.load.image("emptyYard", "assets/emptyYard.jpg")
    this.load.image("menuBg", "assets/menuBg.jpg")
    this.load.image("iconSchool", "assets/iconSchool.png")
    this.load.image("left", "assets/left.png")

    this.load.setPath("assets/spineExport")
    this.load.spine("character", "skeleton.json", "skeleton.atlas", true)
	};
	create(){
		this.scene.start("menu");
	}
}
