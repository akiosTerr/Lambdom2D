import Vector2 from '../static_classes/vector2'
import {listArray,getRandomColor,getRandomPoint,makeSquarePath,rngRound,genRngArray,genRandVec2Array} from '../static_classes/rng'

export default class DrawBuilder{
    constructor(ctx,width,height){
        this.ctx = ctx;        
        this.width = width;
        this.height = height;
        this.thickness = 5;
        this.color = 'blue';
        this.buildings_list = [];
        this.start;
        this.path_array;
        this.current_path;
        this.last_point;
        this.specs = {
            countMin: 8,
            countMax: 25,
            lenghtMin: 30,
            lenghtMax: 110,
        }
    }

    draw(){
        this.buildings_list.forEach(e => this.draw_path(e));
    }

    clear(){
        this.buildings_list = [];
    }

    add_building(){
        let coord = makeSquarePath(this.specs);
        //listArray(coord);
        this.buildings_list.push(coord);
        //listArray(this.buildings_list);
        console.log(this.buildings_list);
        
    }

    scriblings(){
        let _arr = genRandVec2Array(2);
        this.ctx.lineWidth = this.thickness;
        this.ctx.strokeStyle = 'blue';
        this.ctx.beginPath();
        this.ctx.moveTo(_arr[0].x,_arr[0].y);
        this.ctx.lineTo(_arr[1].x,_arr[1].y);
        this.ctx.stroke();
    }

    draw_path(v2arr){
        this.ctx.strokeStyle = this.color;
        this.ctx.beginPath();
        let start = v2arr[0];
        this.ctx.moveTo(start.x,start.y);
       
        for (let i = 1; i < v2arr.length; i++) {
            const obj = v2arr[i];
            this.ctx.lineTo(obj.x,obj.y);
            this.ctx.stroke();
        }
    }
}

export function log_vec2(vec,label){
    console.log(`${label} X:${vec.x} Y:${vec.y}`);
}

