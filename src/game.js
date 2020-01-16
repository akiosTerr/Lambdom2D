import Player from "./player";
import InputHandler from "./input";

export default class Game {
    constructor(gameWidth,gameHeight){
        this.gameHeight = gameHeight;
        this.gameWidth  = gameWidth;
    }

    start(){
        this.player = new Player(this);
        this.gameObjects = [this.player];
        new InputHandler(this.player);
    }

    clear (ctx,color) {
        ctx.fillStyle = color;
        ctx.fillRect(0,0,this.gameWidth,this.gameHeight);
    }
    
    addPlayer(){

    }

    update(deltatime){
        this.gameObjects.forEach(object => object.update(deltatime));
    }

    draw(ctx){
        this.gameObjects.forEach(object => object.draw(ctx));
    }
}