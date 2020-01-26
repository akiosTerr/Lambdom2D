
import { getRandomColor, rngRound } from './../static_classes/rng'

module.exports = class LineDraw {
	constructor(ctx, gameWidth, gameHeight) {
		this.ctx = ctx;
		this.gameWidth = gameWidth;
		this.gameHeight = gameHeight;
		this.offset = 0;
		this.offsetMin = 10;
		this.offsetMax = 400;
		this.mid = (gameHeight / 2);
		this.stroke_thickness = 7;
		this.direction = 0;
		this.lineLenght = 60;
		this.oscilation_speed = 5;
		this.is_active = new Boolean(false);
	}

	rainbowRay() {
		if(!this.is_active){
			return
		}

		this.ctx.beginPath();
		let w = 0;

		//this.ctx.moveTo(100,100);

		while (w < this.gameWidth) {
			let min = this.mid - this.offset;
			let max = this.mid + this.offset;
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

	s_values (obj){
		for (var prop in obj) {
			if (Object.prototype.hasOwnProperty.call(obj, prop)) {
				if(prop == 'offsetMin'){
					this.offsetMin = obj[prop];
					continue;
				}
				if(prop == 'offsetMax'){
					this.offsetMax = obj[prop];
					continue;
				}
				if(prop == 'speed'){
					this.oscilation_speed = obj[prop];
					continue;
				}
				if(prop == 'thickness'){
					this.stroke_thickness = obj[prop];
					continue;
				}
			}
		}
	}

	activation() {
		this.is_active = !this.is_active;
	}

	draw(){
		this.rainbowRay();
	}
}