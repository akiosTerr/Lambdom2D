import Player from "./player";
import InputHandler from "./input";
import DrawBuilder from "./gen_buildings/draw_buildings"
import {fps_counter} from "./fpsCounter"

export default class Game {
    constructor(gameWidth,gameHeight,ctx){
        this.gameHeight = gameHeight;
        this.gameWidth  = gameWidth;
        this.ctx = ctx;
    }

    start(){
        this.player = new Player(this);
        //this.drawBuild = new DrawBuilder(this.ctx,this.gameWidth,this.gameHeight);
        this.gameObjects = [this.player];
        new InputHandler(this.player);
    }

    clear (color) {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(0,0,this.gameWidth,this.gameHeight);
    }
    
    update(deltatime){
        this.gameObjects.forEach(obj => obj.update(deltatime));
    }

    draw(){
        this.gameObjects.forEach(obj => obj.draw(this.ctx));
        fps_counter(this.ctx);
    }

    addObj(obj){
        
    }
}

