define(["Config"], function(Config) {
	return class Field {
		constructor(width, height) {
			this.field = [];
		}

		init() {
			let line = "";
			for(var width = 0; width < this.width; width += Config.blockSize) {
				line += " ";
			}
			for(var height = 0; height < this.height; height += Config.blockSize) {
				this.field.push(line);
			}
		}

		setSize(width, height) {
			this.width = width;
			this.height = height;
		}

		addShape(structure, x, y) {
			for(let h = 0; h < structure.length; h++) {
				for(let w = 0; w < structure[h].length; w++) {
					if(structure[h][w] == "X") {
						var line = this.field[y + h];
						this.field[y + h] = line.substr(0, x + w) + "X" + line.substr(x + w + 1);
					}
				}
			}
		}

		checkOutOfField(shape) {
			return Math.floor(this.height/Config.blockSize) <= shape.y + shape.shape.length;
		}

		clear() {
			this.field = [];
			this.init();
		}

		overlap(shape) {
			for(let h = 0; h < shape.shape.length; h++) {
				for(let w = 0; w < shape.shape[h].length; w++) {
					let x = shape.x + w;
					let y = shape.y + h;
					if(shape.shape[h][w] == "X" && this.field[y][x] == "X") {
						return true;
					}
				}
			}

			return false;
		}
	};
});