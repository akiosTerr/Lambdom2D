import {draw_text} from './ui_draw';

let times = [];
let fps = 0;

function refreshLoop() {
    window.requestAnimationFrame(() => {
        const now = performance.now();
        while (times.length > 0 && times[0] <= now - 1000) {
            times.shift();
        }
        times.push(now);
        fps = times.length;
        refreshLoop();
    });
}

refreshLoop();

export function fps_counter (ctx) {
    draw_text(fps,'green',ctx);
}
