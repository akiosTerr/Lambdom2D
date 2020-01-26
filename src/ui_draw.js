export default class UI {
    constructor(ctx,game){
        this.ctx = ctx;
        this.gameInstance = game;
        this.btns = document.getElementsByClassName('btn');
    }
    add_event () {

    }
}

export function draw_text(txt,color,ctx,){
    ctx.font = "25px Impact";
    ctx.fillStyle = color;
    ctx.fillText(txt, 20, 40);
}

export function get_buttons(){
    
    console.log(elements);
    console.log(elements[0].innerHTML);
    let obj = {};
    elements.foreach(e => console.log(obj[e.innerHtml]));
}

