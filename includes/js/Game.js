define(["Drawer", "Config", "Field"], function(Drawer, Config, Field) {
	return class Game {
		constructor(options) {
			this.canvas = document.getElementById(options.id);
			this.field = new Field(this.canvas.getContext("2d"));

			this.init();
		}

		init() {
			this.setFullScreen();
			this.field.startGame();
		}

		setFullScreen() {
			this.canvas.width = window.innerWidth;
			this.canvas.height = window.innerHeight;
			this.field.setSize(this.canvas.width, this.canvas.height);
			window.addEventListener("resize", function(){
				// this.canvas.width = window.innerWidth;
				// this.canvas.height = window.innerHeight;
				// this.drawer.setSize(this.canvas.width, this.canvas.height);
			}.bind(this), true);
		}
	};
});