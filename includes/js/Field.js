define(["Config", "Drawer"], function(Config, Drawer) {
	return class Field {
		constructor(context) {
			this.shapes = [];
			this.drawer = new Drawer(context);
			this.movingShape = null;

			this.init();
		}

		init() {
			setInterval(function() {
				this.moveShape();
			}.bind(this), Config.tick);
			window.addEventListener("keydown", function(event) {
				switch(event.key) {
					case "ArrowLeft":
						if(this.movingShape.x > 0 && !this.overlap(this.movingShape)) {
							this.movingShape.x--;
							if(!this.overlap(this.movingShape)) {
								this.refreshField();
							} else {
								this.movingShape.x++;
							}
						}
						break;
					case "ArrowRight":
						if(this.movingShape.x + this.movingShape.structure[0].length < Math.floor(this.width/Config.blockSize)) {
							this.movingShape.x++;
							if(!this.overlap(this.movingShape)) {
								this.refreshField();
							} else {
								this.movingShape.x--;
							}
						}
						break;
					case "ArrowDown":
						this.moveShape();
						break;
					case "ArrowUp":
						this.movingShape.turn();
						if(!this.overlap(this.movingShape) && !this.outOfField(this.movingShape)) {
							this.refreshField();
						} else {
							this.movingShape.turnBack();
						}
						break;
				}
			}.bind(this));
		}

		setSize(width, height) {
			this.width = width;
			this.height = height;

			this.drawer.setSize(width, height);
			this.drawer.init();
		}

		startGame() {
			this.addShape(this.generateShape(), Math.floor(this.width/2/Config.blockSize), 0);
		}

		addShape(shape, x, y) {
			shape.x = x;
			shape.y = y;
			this.movingShape = shape;
			this.shapes.push(this.movingShape);
			this.refreshField();
		}

		moveShape() {
			if(this.movingShape) {
				this.movingShape.y++;
				if(this.needStop(this.movingShape)) {
					this.movingShape.y--;
					this.nextShape();
				} else {
					this.refreshField();
				}
			}
		}

		needStop(shape) {
			return this.overlap(shape) || this.outOfField(shape);
		}

		overlap(shape) {
			for(var i = 0; i < this.shapes.length - 1; i++) {
				if(this.overlapShape(this.shapes[i], shape)) {
					return true;
				}
			}

			return false;
		}

		overlapShape(shape1, shape2) {
			for(var h = 0; h < shape1.structure.length; h++) {
				for(var w = 0; w < shape1.structure[h].length; w++) {
					if(shape1.structure[h][w] == "X") {
						var blockX = shape1.x + w;
						var blockY = shape1.y + h;
						if(this.isBlock(shape2, blockX, blockY)) {
							return true;
						}
					}
				}
			}

			return false;
		}

		isBlock(shape, x, y) {
			for(var h = 0; h < shape.structure.length; h++) {
				for(var w = 0; w < shape.structure[h].length; w++) {
					if(shape.structure[h][w] == "X" && shape.x + w == x && shape.y + h == y) {
						return true;
					}
				}
			}

			return false;
		}

		outOfField(shape) {
			return Math.floor(this.height/Config.blockSize) < shape.y + shape.structure.length;
		}

		nextShape() {
			delete this.movingShape;
			this.addShape(this.generateShape(), Math.floor(this.width/2/Config.blockSize), 0);
		}

		generateShape() {
			let shapeIndex = Math.floor(Math.random() * Config.structures.length);
			let structure = Config.structures[shapeIndex][0];

			let colorIndex = Math.floor(Math.random() * Config.colors.length);
			let color = Config.colors[colorIndex];

			return {structure, color, shapeIndex, position: 0, turn: function() {
				this.structure = Config.structures[this.shapeIndex][Math.abs(++this.position) % Config.structures[this.shapeIndex].length];
			}, turnBack: function() {
				this.structure = Config.structures[this.shapeIndex][Math.abs(--this.position) % Config.structures[this.shapeIndex].length];
			}};
		}

		refreshField() {
			this.drawer.refresh(this.shapes);
		}
	};
});