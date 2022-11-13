export class View {
  constructor() {
    this.canvases = [];
    this.debugCanvases = [];
  }

  addCanvas(canvas) {
    this.canvases.push(canvas);
  }

  addDebugCanvas(canvas) {
    this.debugCanvases.push(canvas);
  }

  tick(engine, camera) {
    this.canvases.forEach(canvas => {
      const context = canvas.getContext('2d');

      context.clearRect(0, 0, canvas.width, canvas.height);

      context.rect(0, 0, 640, 240);
      context.fillStyle = 'lightblue';
      context.fill();
      context.fillStyle = 'black';


      camera.rays.forEach((ray, index) => {
        let toRender = [];

        engine.walls.forEach(wall => {
          const intersect = ray.intersectsWall(wall);
          if(intersect) toRender.push({
            distance: Math.sqrt(((intersect.x - camera.x) ** 2) + ((intersect.y - camera.y) ** 2)) * Math.cos((ray.angle) * (Math.PI / 180)),
            color: wall.color,
            height: wall.height,
          });
        });

        toRender.sort(function(a, b) {
          return a.distance - b.distance;
        });
        toRender.reverse();

        toRender.forEach(column => {
          const heightMultiplier = 50;
          const width = canvas.width / camera.numRays;
          const left = canvas.width - (index * width);
          const top = column.distance + (heightMultiplier * (10 - column.height));
          let height = (((canvas.height / 2) - top) * 2) + (heightMultiplier * (10 - column.height))
          if(height < 0) height = 0;

          context.beginPath();
          context.fillStyle = column.color;
          context.rect(left, top, width, height);
          context.fill();
          context.fillStyle = 'black';
          context.closePath();
        });
      });

    });

    this.debugCanvases.forEach(debugCanvas => {
      const context = debugCanvas.getContext('2d');

      context.clearRect(0, 0, debugCanvas.width, debugCanvas.height);

      engine.walls.forEach(wall => {
        context.beginPath();
        context.moveTo(wall.start.x, wall.start.y);
        context.lineTo(wall.end.x, wall.end.y);
        context.stroke();
        context.closePath();
      });

      engine.cameras.forEach(camera => {
        context.beginPath();
        context.strokeStyle = 'blue';
        context.arc(camera.x, camera.y, 3, 0, 2 * Math.PI);
        context.stroke();
        context.strokeStyle = 'black';
        context.closePath();

        camera.rays.forEach(ray => {
          context.beginPath();
          context.strokeStyle = 'yellow';
          context.moveTo(ray.start.x, ray.start.y);
          context.lineTo(ray.end.x, ray.end.y);
          context.stroke();
          context.strokeStyle = 'black';
          context.closePath();
        });
      });
    });
  }
}
