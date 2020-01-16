
//c.fillRect(100,100,100,100);

/*
c.moveTo(0,0);
c.lineTo(500,300);
c.stroke();
*/

export default class LineDraw {
	constructor (ctx,gameWidth,gameHeight){
		this.ctx = ctx;
		this.W = gameWidth;
		this.H = gameHeight;
		this.iterations = 40;
		this.min = 50;
		this.max = 100;
		this.stroke_thickness = 10;
	}

	rainbowRay() {
		this.ctx.beginPath();
		var w = 0;
		//c.moveTo(w,h);
	
		for (var i = 0; i < this.iterations; i++) {
			if(w > this.gameWidth){
				console.log(`out of bounds in:${i} iterations`);
				break;
			}	
			let randHeight = rng(this.min,this.max);
			this.ctx.lineTo(w,randHeight);
			this.ctx.lineWidth = this.stroke_thickness;
			this.ctx.stroke();
			this.ctx.strokeStyle = getRandomColor();
			//h = (h*-1)+300;
			w += 60;
		}
		this.min += 1;
		this.max += 1;
	}
	
}

export function rng(min_value , max_value)
{
    return Math.random() * (max_value-min_value) + min_value ;
}

export function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}