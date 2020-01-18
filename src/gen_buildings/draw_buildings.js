import Vector2 from '../static_classes/vector2'
import {getRandomColor,rngRound,genRngArray,genRandVec2Array} from '../static_classes/rng'

export default class DrawBuildings{
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
        this.start;
        this.path_array;
        this.last_point;
    }

    draw(){
        this.ctx.lineWidth = this.thickness;
        this.ctx.strokeStyle = getRandomColor();
        this.scriblings();
        //setTimeout(() => {this.scriblings}, 1000);
    }

    draw_path(v2arr){
        let start = v2arr[0];
        this.ctx.moveTo(start.x,start.y);
        // v2arr.array.forEach(v2 => {
            
        // });
    }

    scriblings(){
        let len = 3;
        let vec2arr = genRandVec2Array(len);
        let start = vec2arr[0];
        this.ctx.moveTo(start.x,start.y);
        for (let i = 1; i < vec2arr.length; i++) {
            const obj = vec2arr[i];
            this.ctx.lineTo(obj.x,obj.y);
            this.ctx.stroke();
            
        }
    }


    makePath(){
        let start = get_random_point(this.width,this.height);
        let line_count = rngRound(this.lineCountMin,this.lineCountMax);
        let lineLenghts = [];
        //this.path_array = [];
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

