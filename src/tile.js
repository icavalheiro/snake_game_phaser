var square = require('./square');

module.exports = function(graphics, x, y, id, size){
 	this.x = x;
	this.y = y;
	this.id = id;
	this.graphic = new square(
		graphics,
		x,
		y,
		size
	);
}