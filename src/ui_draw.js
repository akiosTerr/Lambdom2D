export function draw_text(txt,color,ctx,){
    ctx.font = "25px Impact";
    ctx.fillStyle = color;
    ctx.fillText(txt, 20, 40);
}

export function get_buttons(){
    let elements = document.getElementsByClassName('btn');
    console.log(elements);
    console.log(elements[0].innerHTML);
    let obj = {};
    elements.foreach(e => console.log(obj[e.innerHtml]));
}

