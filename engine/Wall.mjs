export class Wall {
  constructor() {
    this.start = {x: arguments[0], y: arguments[1]};
    this.end = {x: arguments[2], y: arguments[3]};
    this.color = arguments[4];
    this.height = arguments[5];
    this.texture = arguments[6];
    this.textureOptions = arguments[7];
    this.length = Math.sqrt(((this.start.x - this.end.x) ** 2) + ((this.start.y - this.end.y) ** 2));
  }
}
