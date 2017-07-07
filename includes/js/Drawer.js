define(["Config"], function(Config) {
	return class Drawer {
		constructor(context) {
			this.context = context;
			this.field = new Field();
			this.shapes = [];

			this.field.init();
		}

		init() {
			this.drawCells();
			setInterval(function() {
				this.refresh();
			}.bind(this), Config.tick)
		}

		setSize(width, height) {
			this.width = width;
			this.height = height;

			this.field.setSize(width, height);

			let cellsInHeight = Math.floor(this.height/Config.blockSize);
			this.startY = (this.height - cellsInHeight*Config.blockSize)/2;
			let cellsInWidth = Math.floor(this.width/Config.blockSize);
			this.startX = (this.width - cellsInWidth*Config.blockSize)/2;

			this.drawCells();
			this.field.init();
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

		addShape(shape, x, y, color) {
			var newShape = {
				shape, x, y, color, move: true
			};

			this.shapes.push(newShape);
			this.drawShape(shape, x, y, color);
		}

		drawShape(shape, x, y, color) {
			this.field.addShape(shape, x, y)
			for(let h = 0; h < shape.length; h++) {
				for(let w = 0; w < shape[h].length; w++) {
					if(shape[h][w] == "X") {
						let blockX = x + w;
						let blockY = y + h;
						this.drawBlock(blockX, blockY, color);
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

		refresh() {
			this.field.clear();
			this.context.clearRect(0, 0, this.width, this.height);
			this.drawCells();
			for(var i = 0; i < this.shapes.length; i++) {
				var shape = this.shapes[i];
				if(!this.field.checkOutOfField(shape)) {
					shape.y++;
					if(this.field.overlap(shape)) {
						shape.y--;
					}
				}
				this.drawShape(shape.shape, shape.x, shape.y, shape.color);
			}
		}
	};
});
