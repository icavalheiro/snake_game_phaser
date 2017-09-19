module.exports = function(graphics, x, y, size){
	var color = 0xffffff;
	var defaultColor = color;
	var colorChanged = true;
	this.draw = function(){
		if(!colorChanged)
			return;
			
		graphics.lineStyle(1, 0x000000);
		graphics.beginFill(color, 1);
		graphics.drawRect(x, y, size, size);
		graphics.endFill();
		graphics.lineStyle(0);

		colorChanged = false;
	}

	this.setColor = function(newColor){
		if(newColor != color)
			colorChanged = true;

		color = newColor;
	}

	this.setDefaultColor = function(newColor){
		if(newColor){
			defaultColor = newColor;
		}
	}

	this.resetColor = function(){
		this.setColor(defaultColor);
	}
};