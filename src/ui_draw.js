export function draw_text(txt,color,ctx,){
    ctx.font = "25px Impact";
    ctx.fillStyle = color;
    ctx.fillText(txt, 20, 40);
}