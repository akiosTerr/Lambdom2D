import Game from './game'
import DrawSquare from './gen_buildings/draw_buildings'
import LineDraw from './gen_buildings/line_draw'
import {genRandVec2Array} from './static_classes/rng'

const GAME_WIDTH = 1600;
const GAME_HEIGHT = 800;

const canvas = document.getElementById('gameScreen');
const ctx = canvas.getContext("2d");
canvas.width = GAME_WIDTH;
canvas.height = GAME_HEIGHT;
//ctx.canvas.width = window.innerWidth;
//ctx.canvas.height = window.innerHeight;

const drawSquare = new DrawSquare(ctx,GAME_WIDTH,GAME_HEIGHT);
const ld = new LineDraw(ctx,GAME_WIDTH,GAME_HEIGHT);
const game = new Game(GAME_WIDTH,GAME_HEIGHT,ctx);

game.start();

let _vecArr = genRandVec2Array(5);
_vecArr.forEach((item) => {
    console.log(item);
    
})
//let paths = drawSquare.makePath();
//console.log(`path array:${paths}`);

let lastTime = 0;
const gameLoop = (timestamp) => {
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;
    game.clear('black');
    game.update(deltaTime);
    game.draw();
    drawSquare.draw();
    //ld.rainbowRay();
    requestAnimationFrame(gameLoop);
}
gameLoop();

