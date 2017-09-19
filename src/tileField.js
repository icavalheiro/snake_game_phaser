var Tile = require('./tile')

module.exports = function(graphics, gridSize, width, height){
	var tiles = [];

	for(var i = 0; i < Math.floor(width/gridSize); i++){
		for(var j = 0; j < Math.floor(height/gridSize); j++){
			var t = new Tile(
				graphics,
				i*gridSize,
				j*gridSize,
				tiles.length,
				gridSize
			);
			tiles.push(t);
			t.graphic.setDefaultColor((i+1)*0xffff00);
			t.graphic.resetColor();
			t.graphic.draw();
		}
	}
	
	var test = 0;
	this.update = function(){
		for(var i = 0; i < tiles.length; i++){
			tiles[i].graphic.draw();
		}
	}

	this.width = width;
	this.height = height;
	this.columnsCount = function(){
		return Math.floor(height/gridSize);
	}
}