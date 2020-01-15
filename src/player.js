export default class Player {
    constructor(gameWidth,gameHeight){
        this.width = 50;
        this.height = 50;
        this.color = '#033';
        this.velocity = 50;
        this.accel = {x:0,y:0};
        this.position = {
            x: gameWidth / 2 - this.width /2,
            y: gameHeight - this.height
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

