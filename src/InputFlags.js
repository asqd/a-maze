export default class InputFlags {
  constructor() {
    this.reset()
  }

  read(keys) {
    this.up = keys.up.isDown
    this.down = keys.down.isDown
    this.left = keys.left.isDown
    this.right = keys.right.isDown
    this.action = keys.x.isDown
    this.shoot = keys.z.isDown
  }

  reset() {
    this.up = false
    this.down = false
    this.left = false
    this.right = false
    this.shoot = false
  }
}
