import Player from "./player";
import InputHandler from "./input";
import DrawBuilder from "./procedural_generators/draw_buildings"
import LineDraw from "./procedural_generators/line_draw"
import {fps_counter} from "./fpsCounter"

export default class Game {
    constructor(gameWidth,gameHeight,ctx){
        this.gameHeight = gameHeight;
        this.gameWidth  = gameWidth;
        this.ctx = ctx;
        
    }

    start() {
        this.lineD = new LineDraw(this.ctx,this.gameWidth,this.gameHeight);
        this.dbuilder = new DrawBuilder(this.ctx,this.gameWidth,this.gameHeight);
        this.gameObjects = [];
        this.drawOnlyObjects = [this.dbuilder,this.lineD];
        new InputHandler(this.player);
    }

    lineDrawActivate (){
        this.lineD.activation();
    }

    ld_setv(obj){
        this.lineD.s_values(obj);
    }

    add_Plines(count) {
        for (let i = 0; i < count; i++) {   
            this.dbuilder.add_building();
        }   
    }

    clear_lines(){
        this.dbuilder.clear();
    }

    clear (color) {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(0,0,this.gameWidth,this.gameHeight);
    }

    addObj(obj){
        this.extraObjects.push(obj);
    }
    
    update(deltatime){
        this.gameObjects.forEach(obj => obj.update(deltatime));
    }

    draw(){
        this.gameObjects.forEach(obj => obj.draw(this.ctx));
        this.drawOnlyObjects.forEach(obj => obj.draw());
        fps_counter(this.ctx);
    }
}

