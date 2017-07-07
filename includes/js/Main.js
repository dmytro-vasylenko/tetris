require.config({
	baseUrl: "includes/js/",
	paths: {
		Main: "Main",
		Game: "Game",
		Drawer: "Drawer",
		Field: "Field"
	}
});



require(["Game"], function(Game) {
	var game = new Game({id: "tetris"});
});