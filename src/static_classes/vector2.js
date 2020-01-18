export default class Vector2 {
    constructor(x, y) {
        this.vector2d = {
            x : x,
            y : y,
        };
        this.path = [];
    }

    push_obj (x,y){
        let _obj = {x:x,y:y};
        this.path.push(_obj);
    }

    path_array (){
        return this.path;
    }

    set_vector(x,y){
        this.vector2d.x = x;
        this.vector2d.y = y;
    }
    
    set _path (pathArr){
        this.path = pathArr;
    }
}