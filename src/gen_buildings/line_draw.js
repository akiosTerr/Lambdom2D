
import { getRandomColor, rngRound } from './../static_classes/rng'

module.exports = class LineDraw {
	constructor(ctx, gameWidth, gameHeight) {
		this.ctx = ctx;
		this.W = gameWidth;
		this.H = gameHeight;
		this.iterations = 25;
		this.offset = 0;
		this.offsetMin = 5;
		this.offsetMax = 300;
		this.min = (gameHeight / 2);
		this.max = (gameHeight / 2);
		this.stroke_thickness = 7;
		this.direction = 0;
		this.lineLenght = 80;
		this.oscilation_speed = 17;
	}

	rainbowRay() {
		this.ctx.beginPath();
		let w = 0;

		//this.ctx.moveTo(100,100);

		while (w < this.W) {
			let min = this.min - this.offset;
			let max = this.max + this.offset;
			let randHeight = rngRound(min, max);
			this.ctx.lineWidth = this.stroke_thickness;
			this.ctx.lineTo(w, randHeight);
			this.ctx.stroke();
			this.ctx.strokeStyle = getRandomColor();
			//h = (h*-1)+300;
			w += this.lineLenght;
		} 
		//console.log(`dir:${this.direction} offset:${this.offset}`);

		if (this.direction == 1) {
			this.offset += this.oscilation_speed;
			if (this.offset > this.offsetMax) {
				this.direction = 0;
			}
		} else {
			this.offset -= this.oscilation_speed;
			if (this.offset < this.offsetMin) {
				this.direction = 1;
			}
		}
	}
}