import { Engine } from './engine/Engine.mjs';
import { Camera } from './engine/Camera.mjs';
import { Player } from './engine/Player.mjs';
import { Wall } from './engine/Wall.mjs';


const engine = new Engine();

const player = new Player();
const playerCamera = new Camera();
playerCamera.view.addCanvas(document.getElementById('canvas'));
playerCamera.view.addDebugCanvas(document.getElementById('debugCanvas'));
player.setCamera(playerCamera);
engine.addPlayer(player);
engine.setMainPlayer(0);

engine.onKeyDown('w', function() {
  engine.mainPlayer.moveForward(1);
});
engine.onKeyDown('s', function() {
  engine.mainPlayer.moveBackward(1);
});
engine.onKeyDown('a', function() {
  engine.mainPlayer.moveLeft(1);
});
engine.onKeyDown('d', function() {
  engine.mainPlayer.moveRight(1);
});
engine.onKeyDown('q', function() {
  engine.mainPlayer.rotateLeft(3);
});
engine.onKeyDown('e', function() {
  engine.mainPlayer.rotateRight(3);
});

engine.addWall(new Wall(5, 5, 100, 10, 'black', 10, undefined, {}));
engine.addWall(new Wall(3, 10, 30, 90, 'blue', 10, undefined, {}));
engine.addWall(new Wall(85, 13, 70, 80, 'green', 1, undefined, {}));
engine.addWall(new Wall(100, 100, 150, 100, 'yellow', 10, 'textures/scott.jpg', {type: 'fit'}));

engine.start();
