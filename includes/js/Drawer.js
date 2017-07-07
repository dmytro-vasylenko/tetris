define(["Config"], function(Config) {
	return class Drawer {
		constructor(context) {
			this.context = context;
			this.shapes = [];
		}

		init() {
			this.drawCells();
		}

		setSize(width, height) {
			this.width = width;
			this.height = height;

			let cellsInHeight = Math.floor(this.height/Config.blockSize);
			this.startY = (this.height - cellsInHeight*Config.blockSize)/2;
			let cellsInWidth = Math.floor(this.width/Config.blockSize);
			this.startX = (this.width - cellsInWidth*Config.blockSize)/2;

			this.drawCells();
		}

		drawCells() {
			this.context.beginPath();

			for(let y = this.startY; y < this.height; y += Config.blockSize) {
				this.context.moveTo(0, y);
				this.context.lineTo(this.width, y);
			}
			for(let x = this.startX; x < this.width; x += Config.blockSize) {
				this.context.moveTo(x, 0);
				this.context.lineTo(x, this.height);
			}
			this.context.stroke();
		}

		drawShape(shape) {
			for(let h = 0; h < shape.structure.length; h++) {
				for(let w = 0; w < shape.structure[h].length; w++) {
					if(shape.structure[h][w] == "X") {
						let blockX = shape.x + w;
						let blockY = shape.y + h;
						this.drawBlock(blockX, blockY, shape.color);
					}
				}
			}
		}

		drawBlock(x, y, color) {
			this.context.fillStyle = color;
			let blockX = this.startX + x * Config.blockSize;
			let blockY = this.startY + y * Config.blockSize;
			this.context.fillRect(blockX + 1, blockY + 1, Config.blockSize - 1, Config.blockSize - 1);
		}

		refresh(shapes) {
			this.context.clearRect(0, 0, this.width, this.height);
			this.drawCells();
			for(var i = 0; i < shapes.length; i++) {
				this.drawShape(shapes[i]);
			}
		}
	};
});
