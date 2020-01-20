export default class InputHandler {
    constructor(player){
        document.addEventListener("keyup", event => {
            if (event.isComposing || event.keyCode === 229) {
              return;
            }
           

          });
        document.addEventListener("keydown", event => {
            let key = event.keyCode;
            switch(key) {
                case 97:
                    console.log('left');
                    player.move({x:-1});
                    break;
                case 100:
                    console.log('right');
                    player.move({x:1});
                    break;
                case 119:
                    console.log('up');
                    player.move({y:-1});
                    break;
                case 115:
                    console.log('down');
                    player.move({y:1});
                    break;
                default:
                    console.log(key);
                    break;                
            }
        },false)
    }
}