import { Ray } from './Ray.mjs';
import { View } from './View.mjs';

export class Camera {
  constructor(params) {
    params = params == undefined ? {} : params;
    this.x = params.x == undefined ? 5 : params.x;
    this.y = params.y == undefined ? 5 : params.y;
    this.rays = [];

    this.facing = 0;

    this.numRays = 320;
    this.fov = 90;

    this.view = new View();
  }

  tick(engine) {
    this.rays = [];
    const spacing = this.fov / this.numRays
    for(let i = 0; i < this.numRays; i++) {
      const distToProj = (this.numRays / 2) / Math.tan((this.fov / 2) * (Math.PI / 180));
      // const ray = new Ray(this.x, this.y, (this.facing / 2) + ((180 / Math.PI) * Math.atan((i - (this.numRays / 2)) / distToProj)));
      const ray = new Ray(this.x, this.y, (this.facing - ((spacing * i) - (this.fov / 2))));
      this.rays.push(ray);
    }

    this.view.tick(engine, this);
  }
}
