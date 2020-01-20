import Game from './game'
import DrawBuilder from './gen_buildings/draw_buildings'
import LineDraw from './gen_buildings/line_draw'
import {makeSquarePath,genRandVec2Array} from './static_classes/rng'

const GAME_WIDTH = 1600;
const GAME_HEIGHT = 800;
//ctx.canvas.width = window.innerWidth;
//ctx.canvas.height = window.innerHeight;

const canvas = document.getElementById('gameScreen');
const ctx = canvas.getContext('2d');
canvas.width = GAME_WIDTH;
canvas.height = GAME_HEIGHT;

const btn = document.getElementById('left');
const btn2 = document.getElementById('mid1');
btn.addEventListener('click',pathgen);
btn2.addEventListener('click',vec2array);

const specs = {
    countMin: 4,
    countMax: 8,
    lenghtMin: 3,
    lenghtMax: 7,
}

function vec2array(){
    console.log(genRandVec2Array(10)); 
}
function pathgen(){
    let path_coordinates = makeSquarePath(specs);
    //drawPath(path_coordinates,ctx);
}

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
    //pathgen();
    //ld.rainbowRay(); 

    requestAnimationFrame(gameLoop);
}
gameLoop();

