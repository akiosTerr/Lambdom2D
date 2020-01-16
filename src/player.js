export default class Player {
    constructor(game){
        this.width = 25;
        this.height = 25;
        this.color = 'red';
        this.velocity = 50;
        this.accel = {x:0,y:0};
        this.position = {
            x: game.gameWidth / 2 - this.width /2,
            y: game.gameHeight / 2 - this.height/2
        };
    }

    draw(ctx){
        let {x,y} = this.position;
        let [w,h] = [this.width,this.height]
        ctx.fillStyle = this.color;
        ctx.fillRect(x,y,w,h);
    }

    move(pos){
        this.accel = pos;
    }

    update(deltatime){
        if(!deltatime) return;
        this.position.x += this.accel.x * this.velocity / deltatime;
        this.position.y += this.accel.y * this.velocity / deltatime;
    }
}

