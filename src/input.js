export default class InputHandler {
    constructor(player){
        document.addEventListener("keyup", event => {
            if (event.isComposing || event.keyCode === 229) {
              return;
            }

            if(event.keyCode === 65 ||event.keyCode === 68)
                player.accel.x = 0;
            if(event.keyCode === 87 ||event.keyCode === 83)
                player.accel.y = 0;    

          });
        document.addEventListener("keydown", event => {
            let key = event.keyCode;
            switch(key) {
                case 65:
                    console.log('left');
                    player.accel.x = -1;
                    break;
                case 68:
                    console.log('right');
                    player.accel.x = 1;
                    break;
                case 87:
                    console.log('up');
                    player.accel.y = -1;
                    break;
                case 83:
                    console.log('down');
                    player.accel.y = 1;
                    break;
                default:
                    console.log(key);
                    break;                
            }
        })
    }
}