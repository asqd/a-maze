import InputFlags from './InputFlags';

export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture, frame, bodySizeX = 14, bodySizeY = 14) {
    super(scene, x, y, texture, frame)
    scene.add.existing(this)
    scene.physics.add.existing(this)
    this.setBodySize(bodySizeX, bodySizeY, true)
    // this.setPushable(false)
    // this.body.setBounce(1, 1)
    // this.setCollideWorldBounds(true)
    this.inputFlags = new InputFlags()
    this.keys = scene.input.keyboard.createCursorKeys();
  }

  update() {
    const keys = this.keys;
    const sprite = this;
    const speed = 100;
    const prevVelocity = sprite.body.velocity.clone();

    // Stop any previous movement from the last frame
    sprite.body.setVelocity(0);

    // Horizontal movement
    if (keys.left.isDown) {
      sprite.body.setVelocityX(-speed);
      sprite.setFlipX(true);
    } else if (keys.right.isDown) {
      sprite.body.setVelocityX(speed);
      sprite.setFlipX(false);
    }

    // Vertical movement
    if (keys.up.isDown) {
      sprite.body.setVelocityY(-speed);
    } else if (keys.down.isDown) {
      sprite.body.setVelocityY(speed);
    }

    // Normalize and scale the velocity so that sprite can't move faster along a diagonal
    sprite.body.velocity.normalize().scale(speed);

    // Update the animation last and give left/right/down animations precedence over up animations
    // if (keys.left.isDown || keys.right.isDown || keys.down.isDown) {
    //   sprite.anims.play("player-walk", true);
    // } else if (keys.up.isDown) {
    //   sprite.anims.play("player-walk-back", true);
    // } else {
    //   sprite.anims.stop();

    //   // If we were moving & now we're not, then pick a single idle frame to use
    //   if (prevVelocity.y < 0) sprite.setTexture("characters", 65);
    //   else sprite.setTexture("characters", 46);
    // }
  }
}
