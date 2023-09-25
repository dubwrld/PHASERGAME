let player;
let tile;
let keyD, keyA, keyW, keyE;
let tiles = [];
const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
      debug: true,
      //   set option above to false to turn off hit boxes
    },
    pixelArt: true,
    roundPixels: false,
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

const obj = {
  key: "value",
};
obj.him = "haskjas"; // how to create a new property in objects
console.log(obj);
function preload() {
  this.load.image("backround", "./assets/slotopaint-gamedesign-background.jpg");
  this.load.image("tile", "./assets/Tile_1.png");
  this.load.spritesheet("player", "./assets/HeroKnight.png", {
    frameWidth: 100,
    frameHeight: 55,
    frames: 90,
  });
}

function create() {
  keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
  keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
  keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
  keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
  this.add.tileSprite(0, 0, 0, 0, "backround").setOrigin(0, 0);
  tile = this.physics.add.staticGroup({
    key: "tile",
    setXY: { x: 100, y: 500 },
  });
  player = this.physics.add.sprite(100, 200, "player");
  //   this code below sets player size
  player.setSize(30, 0);
  player.attack = false;
  console.log(player);
  for (i = 0; i < 100; i++) {
    tiles.push(
      this.physics.add.staticGroup({
        key: "tile",
        setXY: { x: 32 * i, y: 500 },
      })
    );
  }
  this.physics.add.collider(player, tiles);
  this.anims.create({
    key: "playerIdle",
    frames: this.anims.generateFrameNumbers("player", { start: 0, end: 7 }),
    frameRate: 10,
    repeat: -1,
  });
  this.anims.create({
    key: "playerRun",
    frames: this.anims.generateFrameNumbers("player", { start: 8, end: 17 }),
    frameRate: 10,
    repeat: -1,
  });
  this.anims.create({
    key: "playerJump",
    frames: this.anims.generateFrameNumbers("player", { start: 38, end: 40 }),
    frameRate: 10,
    repeat: -1,
  });
  this.anims.create({
    key: "playerDescend",
    frames: this.anims.generateFrameNumbers("player", { start: 41, end: 44 }),
    frameRate: 10,
    repeat: -1,
  });
  this.anims.create({
    key: "playerAttack",
    frames: this.anims.generateFrameNumbers("player", { start: 24, end: 29 }),
    frameRate: 10,
    repeat: -1,
  });
  this.cameras.main.startFollow(player, true, 1, 1, 0, 0);
  //   this code above follows character with camera
  player.anims.play("playerDescend", true);
}

function update() {
  //   console.log(player.anims.currentFrame.isLast);
  if (keyD.isDown) {
    player.anims.play("playerRun", true);
    player.flipX = false;
    // this above flips the characters portrait
    player.setVelocityX(100);
  } else {
    player.setVelocityX(0);
  }
  if (keyA.isDown) {
    player.anims.play("playerRun", true);
    player.flipX = true;
    player.setVelocityX(-100);
  }
  if (keyE.isDown) {
    console.log("hello collin");
    player.anims.play("playerAttack", true);
    player.attack = true;
    // player.setVelocityX(0);
    // player.anims.play("playerAttack")
  }

  if (
    player.body.velocity.x === 0 &&
    player.body.touching.down &&
    !player.attack // ! means opposite/false/is not, example: !true = false, !false = true
  ) {
    player.anims.play("playerIdle", true);
    // code above is running animation
  }
  if (keyW.isDown && player.body.touching.down) {
    player.setVelocityY(-200);
    // code above makes character jump
  }
  if (player.body.velocity.y < 0) {
    player.anims.play("playerJump", true);
  } else if (player.body.velocity.y > 0) {
    player.anims.play("playerDescend", true);
  }
  if (player.anims.currentFrame.isLast && player.attack) {
player.attack = false
  }
}

const game = new Phaser.Game(config);
