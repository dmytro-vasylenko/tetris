define(["Config", "Drawer"], function(Config, Drawer) {
	return class Field {
		constructor(context) {
			this.shapes = [];
			this.drawer = new Drawer(context);
			this.movingShape = null;
		}

		setSize(width, height) {
			this.width = width;
			this.height = height;

			this.drawer.setSize(width, height);
			this.drawer.init();
		}

		addShape(shape) {
			this.movingShape = shape;
			this.shapes.push(this.movingShape);
			this.drawer.refresh(this.shapes);
		}

		checkOutOfField(shape) {
			return Math.floor(this.height/Config.blockSize) <= shape.y + shape.shape.length;
		}

		overlap(shape) {
			
		}

		moveShape() {

		}
	};
});