import Game from './game';
import LineDraw, {rng,getRandomColor} from './gen_buildings/line_draw';

const GAME_WIDTH = 1600;
const GAME_HEIGHT = 800;

const canvas = document.getElementById('gameScreen');
const ctx = canvas.getContext("2d");
canvas.width = GAME_WIDTH;
canvas.height = GAME_HEIGHT;
//ctx.canvas.width = window.innerWidth;
//ctx.canvas.height = window.innerHeight;

const ld = new LineDraw(ctx,GAME_WIDTH,GAME_HEIGHT);
const game = new Game(GAME_WIDTH,GAME_HEIGHT,ctx);
game.start();

let lastTime = 0;
const gameLoop = (timestamp) => {
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;
    game.clear('black');
    game.update(deltaTime);
    game.draw();
    ld.rainbowRay();
    requestAnimationFrame(gameLoop);
}
gameLoop();