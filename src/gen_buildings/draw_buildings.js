import Vector2 from '../static_classes/vector2'
import {listArray,getRandomColor,getRandomPoint,makeSquarePath,rngRound,genRngArray,genRandVec2Array} from '../static_classes/rng'

export default class DrawBuilder{
    constructor(ctx,width,height){
        this.ctx = ctx;        
        this.width = width;
        this.height = height;
        this.thickness = 5;
        this.color = 'blue';
        this.lineCountMin = 4;
        this.lineCountMax = 7;
        this.lineLenghtMin = 30;
        this.lineLenghtMax = 80;
        this.buildings_list = [];
        this.start;
        this.path_array;
        this.current_path;
        this.last_point;
        this.specs = {
            countMin: 15,
            countMax: 25,
            lenghtMin: 50,
            lenghtMax: 75,
        }
    }

    draw(){
        this.buildings_list.forEach(e => this.draw_path(e));
    }

    add_building(){
        this.ctx.strokeStyle = getRandomColor();
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
        this.ctx.beginPath();
        let start = v2arr[0];
        this.ctx.moveTo(start.x,start.y);
       
        for (let i = 1; i < v2arr.length; i++) {
            const obj = v2arr[i];
            this.ctx.lineTo(obj.x,obj.y);
            this.ctx.stroke();
        }
    }

    makePath() {
        let start = getRandomPoint(this.width,this.height);
        let line_count = rngRound(this.lineCountMin,this.lineCountMax);
        let lineLenghts = [];
        log_vec2(start,'start:');
        this.path_array.push(start.vector2d);
        lineLenghts = genRngArray(line_count,this.lineLenghtMin,this.lineLenghtMax);

        for (let i = 0; i < lineLenghts.length; i++) {
            console.log(lineLenghts[i]);
        }

        console.log(`Line Count:${line_count}`);
        console.log(`lenghts:${lineLenghts}`);

        for (let i = 0; i < line_count; i++) {
            let new_point = {};

            log_vec2(new_point,' new point');
            if(i == line_count-1){
                console.log('last loop');
                if((Math.round(Math.random())) == 1){
                    new_point.x = start.x;
                }else{
                    new_point.y = start.y;
                }
                this.path_array.push(new_point);
                continue;
            }
            if(i%2){
                let a = Math.round(Math.random());
                let b = (a == 1) ? lineLenghts[i] : (lineLenghts[i]* -1);
                console.log(b);
                new_point.x += b;
            }else{               
                let a = Math.round(Math.random());
                let b = (a == 1) ? lineLenghts[i] : (lineLenghts[i]* -1);
                console.log(b);
                new_point.y += b;
            }
            log_vec2(new_point,'new point end:');
            this.path_array.push(new_point);
            this.last_point = new_point;
        }
        for (let i = 0; i < this.path_array.length; i++) {
            const element = this.path_array[i];
            console.log(element);
        }
        this.path_array.push(start);
       
        return this.path_array;
    }
}

export function log_vec2(vec,label){
    console.log(`${label} X:${vec.x} Y:${vec.y}`);
}

