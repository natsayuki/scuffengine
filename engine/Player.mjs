export class Player {
  constructor() {
    this.camera = undefined
    this.x = arguments[0] == undefined ? 10 : arguments[0];
    this.y = arguments[1] == undefined ? 10 : arguments[0];
    this.prevX = 0;
    this.prevY = 0;
    this.facing = 0;
  }

  setCamera(camera) {
    this.camera = camera;
  }

  tick(engine) {
    this.camera.x = this.x;
    this.camera.y = this.y;
    this.camera.facing = this.facing;
  }

  directionFromAngle(angle, amount) {
    return [amount*Math.cos(angle*(Math.PI/180)), amount*Math.sin(angle*(Math.PI/180))];
  }

  moveToAngle(angle, amount) {
    let finalPos = this.directionFromAngle(angle, amount);
    this.prevX = this.x;
    this.prevY = this.y;
    this.x += finalPos[0];
    this.y += finalPos[1];
  }

  moveForward(amount) {
    this.moveToAngle(this.facing, amount);
  }

  moveBackward(amount) {
    this.moveToAngle(this.facing + 180, amount);
  }

  moveLeft(amount) {
    this.moveToAngle(this.facing - 90, amount);
  }

  moveRight(amount) {
    this.moveToAngle(this.facing + 90, amount);
  }

  rotateLeft(amount) {
    this.facing -= amount;
  }

  rotateRight(amount) {
    this.facing += amount;
  }
}
