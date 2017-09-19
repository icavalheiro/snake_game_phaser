var square = require('./square');

module.exports = function(graphics, x, y, id, size){
	//class methods and properties
	this.x = x;
	this.y = y;
	this.id = id;
	this.hasFood = false;
	this.hasSnake = false;
	this.graphic = new square(
		graphics,
		x,
		y,
		size
	);

	this.setFood = function(){
		this.hasSnake = false;
		this.hasFood = true;
		this.graphic.setColor(0xff0000);
	};

	this.setSnake = function(){
		this.hasSnake = true;
		this.hasFood = false;
		this.graphic.setColor(0x00ff00);
	};

	this.setEmpty = function(){
		this.hasFood = false;
		this.hasSnake = false;
		this.graphic.resetColor();
	};
}