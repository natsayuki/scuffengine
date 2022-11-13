export class Ray {
  constructor() {
    this.x = arguments[0];
    this.y = arguments[1];
    this.angle = arguments[2];

    this.length = 1050;

    this.start = {x: this.x, y: this.y};
    this.end = {x: this.x + this.length*Math.cos(this.angle*(Math.PI/180)), y: this.y + this.length*Math.sin(this.angle*(Math.PI/180))};
  }

  intersectsWall(wall) {
    const s1_x = wall.end.x - wall.start.x;
    const s1_y = wall.end.y - wall.start.y;
    const s2_x = this.end.x - this.start.x;
    const s2_y = this.end.y - this.start.y;

    const s =(-s1_y * (wall.start.x - this.start.x) + s1_x * (wall.start.y - this.start.y)) / (-s2_x * s1_y + s1_x * s2_y);
    const t = ( s2_x * (wall.start.y - this.start.y) - s2_y * (wall.start.x - this.start.x)) / (-s2_x * s1_y + s1_x * s2_y);

    if(s >= 0 && s <= 1 && t >= 0 && t <= 1){
      return {x: wall.start.x + (t*s1_x), y : wall.start.y + (t*s1_y)};
    }
    return undefined;
  }
}
