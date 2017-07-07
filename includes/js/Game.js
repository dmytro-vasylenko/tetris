define(["Drawer", "Config", "Field"], function(Drawer, Config, Field) {
	return class Game {
		constructor(options) {
			this.canvas = document.getElementById(options.id);
			this.context = this.canvas.getContext("2d");
			this.field = new Field();

			this.init();
		}

		init() {
			this.setFullScreen();
			this.drawer.init();
			this.addShape(this.generateShape(), 5, 0);
			setInterval(function() {
				this.addShape(this.generateShape(), Math.floor(10 * Math.random()), 0);
			}.bind(this), 2000);
		}

		setFullScreen() {
			this.canvas.width = window.innerWidth;
			this.canvas.height = window.innerHeight;
			this.drawer.setSize(this.canvas.width, this.canvas.height);
			window.addEventListener("resize", function(){
				// this.canvas.width = window.innerWidth;
				// this.canvas.height = window.innerHeight;
				// this.drawer.setSize(this.canvas.width, this.canvas.height);
			}.bind(this), true);
		}

		generateShape() {
			let shapeIndex = Math.floor(Math.random() * Config.shapes.length);
			let structure = Config.shapes[shapeIndex];

			let colorIndex = Math.floor(Math.random() * Config.colors.length);
			let color = Config.colors[colorIndex];

			return {structure, color};
		}

		addShape(shape, x, y) {
			this.drawer.addShape(shape.structure, x, y, shape.color);
		}
	};
});