export default class Vector2 {
    constructor() {
        this.vector2d = {
            x : 0,
            y : 0,
        };
        this.path = [];
    }

    push_obj (_obj){
        this.vector2d = _obj;
        this.path.push(_obj);
    }

    add_vector (x,y){
        let vec = {
            x : this.vector2d.x,
            y : this.vector2d.y,
        }
        vec.x += x;
        vec.y += y;
        this.push_obj(vec);
    }

    set_vector(x,y){
        this.vector2d.x = x;
        this.vector2d.y = y;
    }

    a_path(){
        return this.path
    }
}