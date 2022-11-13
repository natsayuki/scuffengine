export class Wall {
  constructor() {
    this.start = {x: arguments[0], y: arguments[1]};
    this.end = {x: arguments[2], y: arguments[3]};
    this.color = arguments[4];
    this.height = arguments[5];
  }
}
