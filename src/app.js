import Player from './player';
import InputHandler from './input';

const GAME_WIDTH = 800;
const GAME_HEIGHT = 500;

let player = new Player(GAME_WIDTH,GAME_HEIGHT);
const input = new InputHandler(player);

const canvas = document.getElementById('gameScreen');
const ctx = canvas.getContext("2d");
canvas.width = GAME_WIDTH;
canvas.height = GAME_HEIGHT;

let clear = () => {
    ctx.clearRect(0,0,GAME_WIDTH,GAME_HEIGHT);
}

let lastTime = 0;

let gameLoop = (timestamp) => {
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;
    
    clear();
    player.update(deltaTime);
    player.draw(ctx);

    requestAnimationFrame(gameLoop);
}
gameLoop();