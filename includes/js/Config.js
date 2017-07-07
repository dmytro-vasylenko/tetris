define([], function() {
	return {
		blockSize: 30,
		structures: [
			[ // I
				["X",
				"X",
				"X",
				"X"],
				["XXXX"]
			],
			[ // L
				["X ",
				"X ",
				"XX"],
				["XXX",
				"X  "],
				["XX",
				" X",
				" X"],
				["  X",
				"XXX"]
			],
			[ // T
				["XXX",
				" X "],
				[" X",
				"XX",
				" X"],
				[" X ",
				"XXX"],
				["X ",
				"XX",
				"X "]
			],
			[ // Z
				["XX ",
				" XX"],
				[" X",
				"XX",
				"X "]
			],
			[ // O
				["XX",
				"XX"]
			],
			[ // J
				[" X",
				" X",
				"XX"],
				["X  ",
				"XXX"],
				["XX",
				"X ",
				"X "],
				["XXX",
				"  X"]
			]
		],
		colors: ["red", "yellow", "blue", "green", "white", "orange"],
		tick: 1000
	};
});