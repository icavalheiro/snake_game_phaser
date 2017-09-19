(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
require('./snakeGame');

},{"./snakeGame":3}],2:[function(require,module,exports){
module.exports = function(tileField){
	this.update = function(){
		
	};
};
},{}],3:[function(require,module,exports){
var tileField = require('./tileField');
var Snake = require('./snake');

var gameWidth = 400;
var gameHeight = 400;

var game = new Phaser.Game(gameWidth+1,gameHeight+1, Phaser.AUTO, 'game', {
	preload: preload,
	create: create,
	update: update
});

var gameField;
var snake;
function preload(){
	gameField = new tileField(game.add.graphics(0,0), 10, gameWidth, gameHeight);
	snake = new Snake(gameField);
}

function create(){}

function update(){
	snake.update();
	gameField.update();
}


module.exports = game;
},{"./snake":2,"./tileField":6}],4:[function(require,module,exports){
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
},{}],5:[function(require,module,exports){
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
},{"./square":4}],6:[function(require,module,exports){
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
},{"./tile":5}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkQ6XFxQcm9qZWN0c1xccGhhemVyX3NuYWtlXFxub2RlX21vZHVsZXNcXGJyb3dzZXItcGFja1xcX3ByZWx1ZGUuanMiLCJEOi9Qcm9qZWN0cy9waGF6ZXJfc25ha2Uvc3JjL2Zha2VfNDM5ODMyM2MuanMiLCJEOi9Qcm9qZWN0cy9waGF6ZXJfc25ha2Uvc3JjL3NuYWtlLmpzIiwiRDovUHJvamVjdHMvcGhhemVyX3NuYWtlL3NyYy9zbmFrZUdhbWUuanMiLCJEOi9Qcm9qZWN0cy9waGF6ZXJfc25ha2Uvc3JjL3NxdWFyZS5qcyIsIkQ6L1Byb2plY3RzL3BoYXplcl9zbmFrZS9zcmMvdGlsZS5qcyIsIkQ6L1Byb2plY3RzL3BoYXplcl9zbmFrZS9zcmMvdGlsZUZpZWxkLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKX12YXIgZj1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwoZi5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxmLGYuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwicmVxdWlyZSgnLi9zbmFrZUdhbWUnKTtcclxuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih0aWxlRmllbGQpe1xyXG5cdHRoaXMudXBkYXRlID0gZnVuY3Rpb24oKXtcclxuXHRcdFxyXG5cdH07XHJcbn07IiwidmFyIHRpbGVGaWVsZCA9IHJlcXVpcmUoJy4vdGlsZUZpZWxkJyk7XHJcbnZhciBTbmFrZSA9IHJlcXVpcmUoJy4vc25ha2UnKTtcclxuXHJcbnZhciBnYW1lV2lkdGggPSA0MDA7XHJcbnZhciBnYW1lSGVpZ2h0ID0gNDAwO1xyXG5cclxudmFyIGdhbWUgPSBuZXcgUGhhc2VyLkdhbWUoZ2FtZVdpZHRoKzEsZ2FtZUhlaWdodCsxLCBQaGFzZXIuQVVUTywgJ2dhbWUnLCB7XHJcblx0cHJlbG9hZDogcHJlbG9hZCxcclxuXHRjcmVhdGU6IGNyZWF0ZSxcclxuXHR1cGRhdGU6IHVwZGF0ZVxyXG59KTtcclxuXHJcbnZhciBnYW1lRmllbGQ7XHJcbnZhciBzbmFrZTtcclxuZnVuY3Rpb24gcHJlbG9hZCgpe1xyXG5cdGdhbWVGaWVsZCA9IG5ldyB0aWxlRmllbGQoZ2FtZS5hZGQuZ3JhcGhpY3MoMCwwKSwgMTAsIGdhbWVXaWR0aCwgZ2FtZUhlaWdodCk7XHJcblx0c25ha2UgPSBuZXcgU25ha2UoZ2FtZUZpZWxkKTtcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlKCl7fVxyXG5cclxuZnVuY3Rpb24gdXBkYXRlKCl7XHJcblx0c25ha2UudXBkYXRlKCk7XHJcblx0Z2FtZUZpZWxkLnVwZGF0ZSgpO1xyXG59XHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBnYW1lOyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZ3JhcGhpY3MsIHgsIHksIHNpemUpe1xyXG5cdHZhciBjb2xvciA9IDB4ZmZmZmZmO1xyXG5cdHZhciBkZWZhdWx0Q29sb3IgPSBjb2xvcjtcclxuXHR2YXIgY29sb3JDaGFuZ2VkID0gdHJ1ZTtcclxuXHR0aGlzLmRyYXcgPSBmdW5jdGlvbigpe1xyXG5cdFx0aWYoIWNvbG9yQ2hhbmdlZClcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcclxuXHRcdGdyYXBoaWNzLmxpbmVTdHlsZSgxLCAweDAwMDAwMCk7XHJcblx0XHRncmFwaGljcy5iZWdpbkZpbGwoY29sb3IsIDEpO1xyXG5cdFx0Z3JhcGhpY3MuZHJhd1JlY3QoeCwgeSwgc2l6ZSwgc2l6ZSk7XHJcblx0XHRncmFwaGljcy5lbmRGaWxsKCk7XHJcblx0XHRncmFwaGljcy5saW5lU3R5bGUoMCk7XHJcblxyXG5cdFx0Y29sb3JDaGFuZ2VkID0gZmFsc2U7XHJcblx0fVxyXG5cclxuXHR0aGlzLnNldENvbG9yID0gZnVuY3Rpb24obmV3Q29sb3Ipe1xyXG5cdFx0aWYobmV3Q29sb3IgIT0gY29sb3IpXHJcblx0XHRcdGNvbG9yQ2hhbmdlZCA9IHRydWU7XHJcblxyXG5cdFx0Y29sb3IgPSBuZXdDb2xvcjtcclxuXHR9XHJcblxyXG5cdHRoaXMuc2V0RGVmYXVsdENvbG9yID0gZnVuY3Rpb24obmV3Q29sb3Ipe1xyXG5cdFx0aWYobmV3Q29sb3Ipe1xyXG5cdFx0XHRkZWZhdWx0Q29sb3IgPSBuZXdDb2xvcjtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHRoaXMucmVzZXRDb2xvciA9IGZ1bmN0aW9uKCl7XHJcblx0XHR0aGlzLnNldENvbG9yKGRlZmF1bHRDb2xvcik7XHJcblx0fVxyXG59OyIsInZhciBzcXVhcmUgPSByZXF1aXJlKCcuL3NxdWFyZScpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihncmFwaGljcywgeCwgeSwgaWQsIHNpemUpe1xyXG4gXHR0aGlzLnggPSB4O1xyXG5cdHRoaXMueSA9IHk7XHJcblx0dGhpcy5pZCA9IGlkO1xyXG5cdHRoaXMuZ3JhcGhpYyA9IG5ldyBzcXVhcmUoXHJcblx0XHRncmFwaGljcyxcclxuXHRcdHgsXHJcblx0XHR5LFxyXG5cdFx0c2l6ZVxyXG5cdCk7XHJcbn0iLCJ2YXIgVGlsZSA9IHJlcXVpcmUoJy4vdGlsZScpXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGdyYXBoaWNzLCBncmlkU2l6ZSwgd2lkdGgsIGhlaWdodCl7XHJcblx0dmFyIHRpbGVzID0gW107XHJcblxyXG5cdGZvcih2YXIgaSA9IDA7IGkgPCBNYXRoLmZsb29yKHdpZHRoL2dyaWRTaXplKTsgaSsrKXtcclxuXHRcdGZvcih2YXIgaiA9IDA7IGogPCBNYXRoLmZsb29yKGhlaWdodC9ncmlkU2l6ZSk7IGorKyl7XHJcblx0XHRcdHZhciB0ID0gbmV3IFRpbGUoXHJcblx0XHRcdFx0Z3JhcGhpY3MsXHJcblx0XHRcdFx0aSpncmlkU2l6ZSxcclxuXHRcdFx0XHRqKmdyaWRTaXplLFxyXG5cdFx0XHRcdHRpbGVzLmxlbmd0aCxcclxuXHRcdFx0XHRncmlkU2l6ZVxyXG5cdFx0XHQpO1xyXG5cdFx0XHR0aWxlcy5wdXNoKHQpO1xyXG5cdFx0XHR0LmdyYXBoaWMuc2V0RGVmYXVsdENvbG9yKChpKzEpKjB4ZmZmZjAwKTtcclxuXHRcdFx0dC5ncmFwaGljLnJlc2V0Q29sb3IoKTtcclxuXHRcdFx0dC5ncmFwaGljLmRyYXcoKTtcclxuXHRcdH1cclxuXHR9XHJcblx0XHJcblx0dmFyIHRlc3QgPSAwO1xyXG5cdHRoaXMudXBkYXRlID0gZnVuY3Rpb24oKXtcclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCB0aWxlcy5sZW5ndGg7IGkrKyl7XHJcblx0XHRcdHRpbGVzW2ldLmdyYXBoaWMuZHJhdygpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0dGhpcy53aWR0aCA9IHdpZHRoO1xyXG5cdHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xyXG5cdHRoaXMuY29sdW1uc0NvdW50ID0gZnVuY3Rpb24oKXtcclxuXHRcdHJldHVybiBNYXRoLmZsb29yKGhlaWdodC9ncmlkU2l6ZSk7XHJcblx0fVxyXG59Il19
