import Game from './game'

const GAME_WIDTH = 1600;
const GAME_HEIGHT = 800;
//ctx.canvas.width = window.innerWidth;
//ctx.canvas.height = window.innerHeight;

const canvas = document.getElementById('gameScreen');
const ctx = canvas.getContext('2d');
canvas.width = GAME_WIDTH;
canvas.height = GAME_HEIGHT;

//const btn2 = document.getElementById('mid1');
//btn2.addEventListener('click',vec2array);

const specs = {
    countMin: 4,
    countMax: 8,
    lenghtMin: 3,
    lenghtMax: 7,
}

const game = new Game(GAME_WIDTH,GAME_HEIGHT,ctx);
game.start();

const btn = document.getElementById('left');
btn.addEventListener('click',bgen);

function bgen () {
    game.input()
}

let lastTime = 0;
const gameLoop = (timestamp) => {
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;
    game.clear('black');
    game.update(deltaTime);
    game.draw();

    requestAnimationFrame(gameLoop);
}
gameLoop();

