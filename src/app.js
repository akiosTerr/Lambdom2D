import Game from './game'

const GAME_WIDTH = 1600;
const GAME_HEIGHT = 800;
//ctx.canvas.width = window.innerWidth;
//ctx.canvas.height = window.innerHeight;

const canvas = document.getElementById('gameScreen');
const ctx = canvas.getContext('2d');
canvas.width = GAME_WIDTH;
canvas.height = GAME_HEIGHT;

const game = new Game(GAME_WIDTH,GAME_HEIGHT,ctx);
game.start();

const btn = document.getElementById('left');
const btn2 = document.getElementById('mid1');
const btn3 = document.getElementById('mid2');

btn.addEventListener('click',bgen);
btn2.addEventListener('click',clear);
btn3.addEventListener('click',line_draw);

let tag = new Boolean(false);
function line_draw(){
    game.lineDrawActivate();
    let child = btn3.firstElementChild;
    if(tag){
        child.className = 'badge badge-danger';
        child.innerHTML = 'Off'
        tag = false;
    }else{
        child.className = 'badge badge-success';
        child.innerHTML = 'On'
        tag = true;
    }
}
function bgen () {
    game.add_Plines(10);
}
function clear () {
    game.clear_lines();
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

