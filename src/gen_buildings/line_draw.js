
//c.fillRect(100,100,100,100);

/*
c.moveTo(0,0);
c.lineTo(500,300);
c.stroke();
*/

module.exports = class LineDraw {
	constructor (ctx,gameWidth,gameHeight){
		this.ctx = ctx;
		this.W = gameWidth;
		this.H = gameHeight;
		this.iterations = 27;
		this.offset = 10;
		this.min = (gameHeight/2);
		this.max = (gameHeight/2);
		this.stroke_thickness = 7;
		this.direction = 0;
		this.oscilation_speed = 15;
	}

	rainbowRay() {
		this.ctx.beginPath();
		let w = 0;

		//this.ctx.moveTo(100,100);
	
		for (var i = 0; i < this.iterations; i++) {
			if(w > this.gameWidth){
				console.log(`out of bounds in:${i} iterations`);
				break;
			}
			let min = this.min - this.offset;
			let max = this.max + this.offset;	
			let randHeight = rng(min,max);
			this.ctx.lineWidth = this.stroke_thickness;
			this.ctx.lineTo(w,randHeight);
			this.ctx.stroke();
			this.ctx.strokeStyle = getRandomColor();
			//h = (h*-1)+300;
			w += 65;
		}
		console.log(`dir:${this.direction} offset:${this.offset}`);
		
		if(this.direction == 1) {
			this.offset+=this.oscilation_speed;	
			if(this.offset > 400) {
				console.log('change');
				this.direction = 0;
			}
		}else {
			this.offset-=this.oscilation_speed;	
			if(this.offset < 10) {
				this.direction = 1;
			}
		}
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