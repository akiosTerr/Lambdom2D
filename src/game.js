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

    input() {
        this.dbuilder.add_building();
    }

    start() {
        this.player = new Player(this);
        this.dbuilder = new DrawBuilder(this.ctx,this.gameWidth,this.gameHeight);
        this.gameObjects = [this.player];
        this.drawOnlyObjects = [this.dbuilder];
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
        this.drawOnlyObjects.forEach(obj => obj.draw());
        fps_counter(this.ctx);
    }

    addObj(obj){
        this.extraObjects.push(obj);
    }
}

