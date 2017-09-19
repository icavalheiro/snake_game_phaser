(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
require('./snakeGame');

},{"./snakeGame":3}],2:[function(require,module,exports){
module.exports = function(tileField){
	var fieldWidth = tileField.columnsCount();
	var fieldHeight = tileField.linesCount();

	var direction = 'right';
	size = 2;
	var head;
	var body = [];
	function setHead(tile){
		if(head)
			body.push(head);
		head = tile;
		if(tile.hasFood){
			size ++;
		}
		tile.setSnake();
		if(body.length > size){
			var toEmpty = body.shift();
			toEmpty.setEmpty();
		}
	}

	setHead(tileField.tiles[
		(fieldHeight / 2)
		* fieldWidth
		+ (fieldWidth / 2)
	]);

	this.setDirection = function(d){
		direction = d;
	};

	this.update = function(){
		switch(direction){
			default:
			case 'right':
			var newIndex = head.id + fieldWidth;
			if(newIndex > tileField.tiles.length){
				newIndex = (head.id % fieldHeight);
			}
			setHead(tileField.tiles[newIndex]);
			break;
			case 'left':
			var newIndex = head.id - fieldWidth;
			if(newIndex < 0)
				newIndex = (fieldWidth * fieldHeight) - (fieldHeight - head.id);
			setHead(tileField.tiles[newIndex]);
			break;
			case 'down':
			var newIndex = head.id + 1;
			if(newIndex % fieldHeight == 0)
				newIndex -= fieldWidth;
			setHead(tileField.tiles[newIndex]);
			break;
			case 'up':
			var newIndex = head.id - 1;
			if((newIndex+1) % fieldHeight == 0)
				newIndex += fieldWidth;
			setHead(tileField.tiles[newIndex]);
			break;
		}
	};
};
},{}],3:[function(require,module,exports){
var tileField = require('./tileField');
var Snake = require('./snake');

var gameWidth = 400;
var gameHeight = 400;

var game = new Phaser.Game(gameWidth+1,gameHeight+51, Phaser.AUTO, 'game', {
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

function create(){
	console.log('entrou nas keys');
	game.input.keyboard.onDownCallback = function(key){
		switch(key.key){
			default:
				break;

			case 'a':
			case 'ArrowLeft':
				snake.setDirection('left');
				break;

			case 'd':
			case 'ArrowRight':
				snake.setDirection('right');
				break;
				
			case 'w':
			case 'ArrowUp':
				snake.setDirection('up');
				break;

			case 's':
			case 'ArrowDown':
				snake.setDirection('down');
				break;
		}
	};
}

function update(){
	gameField.update();
}

setInterval(() =>{
	snake.update();
}, 100);
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
		return Math.floor(width/gridSize);
	}

	this.linesCount = function(){
		return Math.floor(height/gridSize);
	};

	this.tiles = tiles;
}
},{"./tile":5}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkQ6XFxQcm9qZWN0c1xcc25ha2VfZ2FtZV9waGFzZXJcXG5vZGVfbW9kdWxlc1xcYnJvd3Nlci1wYWNrXFxfcHJlbHVkZS5qcyIsIkQ6L1Byb2plY3RzL3NuYWtlX2dhbWVfcGhhc2VyL3NyYy9mYWtlX2NiMTc2MDI1LmpzIiwiRDovUHJvamVjdHMvc25ha2VfZ2FtZV9waGFzZXIvc3JjL3NuYWtlLmpzIiwiRDovUHJvamVjdHMvc25ha2VfZ2FtZV9waGFzZXIvc3JjL3NuYWtlR2FtZS5qcyIsIkQ6L1Byb2plY3RzL3NuYWtlX2dhbWVfcGhhc2VyL3NyYy9zcXVhcmUuanMiLCJEOi9Qcm9qZWN0cy9zbmFrZV9nYW1lX3BoYXNlci9zcmMvdGlsZS5qcyIsIkQ6L1Byb2plY3RzL3NuYWtlX2dhbWVfcGhhc2VyL3NyYy90aWxlRmllbGQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBOztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3Rocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIil9dmFyIGY9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGYuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sZixmLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInJlcXVpcmUoJy4vc25ha2VHYW1lJyk7XHJcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24odGlsZUZpZWxkKXtcclxuXHR2YXIgZmllbGRXaWR0aCA9IHRpbGVGaWVsZC5jb2x1bW5zQ291bnQoKTtcclxuXHR2YXIgZmllbGRIZWlnaHQgPSB0aWxlRmllbGQubGluZXNDb3VudCgpO1xyXG5cclxuXHR2YXIgZGlyZWN0aW9uID0gJ3JpZ2h0JztcclxuXHRzaXplID0gMjtcclxuXHR2YXIgaGVhZDtcclxuXHR2YXIgYm9keSA9IFtdO1xyXG5cdGZ1bmN0aW9uIHNldEhlYWQodGlsZSl7XHJcblx0XHRpZihoZWFkKVxyXG5cdFx0XHRib2R5LnB1c2goaGVhZCk7XHJcblx0XHRoZWFkID0gdGlsZTtcclxuXHRcdGlmKHRpbGUuaGFzRm9vZCl7XHJcblx0XHRcdHNpemUgKys7XHJcblx0XHR9XHJcblx0XHR0aWxlLnNldFNuYWtlKCk7XHJcblx0XHRpZihib2R5Lmxlbmd0aCA+IHNpemUpe1xyXG5cdFx0XHR2YXIgdG9FbXB0eSA9IGJvZHkuc2hpZnQoKTtcclxuXHRcdFx0dG9FbXB0eS5zZXRFbXB0eSgpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0c2V0SGVhZCh0aWxlRmllbGQudGlsZXNbXHJcblx0XHQoZmllbGRIZWlnaHQgLyAyKVxyXG5cdFx0KiBmaWVsZFdpZHRoXHJcblx0XHQrIChmaWVsZFdpZHRoIC8gMilcclxuXHRdKTtcclxuXHJcblx0dGhpcy5zZXREaXJlY3Rpb24gPSBmdW5jdGlvbihkKXtcclxuXHRcdGRpcmVjdGlvbiA9IGQ7XHJcblx0fTtcclxuXHJcblx0dGhpcy51cGRhdGUgPSBmdW5jdGlvbigpe1xyXG5cdFx0c3dpdGNoKGRpcmVjdGlvbil7XHJcblx0XHRcdGRlZmF1bHQ6XHJcblx0XHRcdGNhc2UgJ3JpZ2h0JzpcclxuXHRcdFx0dmFyIG5ld0luZGV4ID0gaGVhZC5pZCArIGZpZWxkV2lkdGg7XHJcblx0XHRcdGlmKG5ld0luZGV4ID4gdGlsZUZpZWxkLnRpbGVzLmxlbmd0aCl7XHJcblx0XHRcdFx0bmV3SW5kZXggPSAoaGVhZC5pZCAlIGZpZWxkSGVpZ2h0KTtcclxuXHRcdFx0fVxyXG5cdFx0XHRzZXRIZWFkKHRpbGVGaWVsZC50aWxlc1tuZXdJbmRleF0pO1xyXG5cdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSAnbGVmdCc6XHJcblx0XHRcdHZhciBuZXdJbmRleCA9IGhlYWQuaWQgLSBmaWVsZFdpZHRoO1xyXG5cdFx0XHRpZihuZXdJbmRleCA8IDApXHJcblx0XHRcdFx0bmV3SW5kZXggPSAoZmllbGRXaWR0aCAqIGZpZWxkSGVpZ2h0KSAtIChmaWVsZEhlaWdodCAtIGhlYWQuaWQpO1xyXG5cdFx0XHRzZXRIZWFkKHRpbGVGaWVsZC50aWxlc1tuZXdJbmRleF0pO1xyXG5cdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSAnZG93bic6XHJcblx0XHRcdHZhciBuZXdJbmRleCA9IGhlYWQuaWQgKyAxO1xyXG5cdFx0XHRpZihuZXdJbmRleCAlIGZpZWxkSGVpZ2h0ID09IDApXHJcblx0XHRcdFx0bmV3SW5kZXggLT0gZmllbGRXaWR0aDtcclxuXHRcdFx0c2V0SGVhZCh0aWxlRmllbGQudGlsZXNbbmV3SW5kZXhdKTtcclxuXHRcdFx0YnJlYWs7XHJcblx0XHRcdGNhc2UgJ3VwJzpcclxuXHRcdFx0dmFyIG5ld0luZGV4ID0gaGVhZC5pZCAtIDE7XHJcblx0XHRcdGlmKChuZXdJbmRleCsxKSAlIGZpZWxkSGVpZ2h0ID09IDApXHJcblx0XHRcdFx0bmV3SW5kZXggKz0gZmllbGRXaWR0aDtcclxuXHRcdFx0c2V0SGVhZCh0aWxlRmllbGQudGlsZXNbbmV3SW5kZXhdKTtcclxuXHRcdFx0YnJlYWs7XHJcblx0XHR9XHJcblx0fTtcclxufTsiLCJ2YXIgdGlsZUZpZWxkID0gcmVxdWlyZSgnLi90aWxlRmllbGQnKTtcclxudmFyIFNuYWtlID0gcmVxdWlyZSgnLi9zbmFrZScpO1xyXG5cclxudmFyIGdhbWVXaWR0aCA9IDQwMDtcclxudmFyIGdhbWVIZWlnaHQgPSA0MDA7XHJcblxyXG52YXIgZ2FtZSA9IG5ldyBQaGFzZXIuR2FtZShnYW1lV2lkdGgrMSxnYW1lSGVpZ2h0KzUxLCBQaGFzZXIuQVVUTywgJ2dhbWUnLCB7XHJcblx0cHJlbG9hZDogcHJlbG9hZCxcclxuXHRjcmVhdGU6IGNyZWF0ZSxcclxuXHR1cGRhdGU6IHVwZGF0ZVxyXG59KTtcclxuXHJcbnZhciBnYW1lRmllbGQ7XHJcbnZhciBzbmFrZTtcclxuZnVuY3Rpb24gcHJlbG9hZCgpe1xyXG5cdGdhbWVGaWVsZCA9IG5ldyB0aWxlRmllbGQoZ2FtZS5hZGQuZ3JhcGhpY3MoMCwwKSwgMTAsIGdhbWVXaWR0aCwgZ2FtZUhlaWdodCk7XHJcblx0c25ha2UgPSBuZXcgU25ha2UoZ2FtZUZpZWxkKTtcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlKCl7XHJcblx0Y29uc29sZS5sb2coJ2VudHJvdSBuYXMga2V5cycpO1xyXG5cdGdhbWUuaW5wdXQua2V5Ym9hcmQub25Eb3duQ2FsbGJhY2sgPSBmdW5jdGlvbihrZXkpe1xyXG5cdFx0c3dpdGNoKGtleS5rZXkpe1xyXG5cdFx0XHRkZWZhdWx0OlxyXG5cdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0Y2FzZSAnYSc6XHJcblx0XHRcdGNhc2UgJ0Fycm93TGVmdCc6XHJcblx0XHRcdFx0c25ha2Uuc2V0RGlyZWN0aW9uKCdsZWZ0Jyk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRjYXNlICdkJzpcclxuXHRcdFx0Y2FzZSAnQXJyb3dSaWdodCc6XHJcblx0XHRcdFx0c25ha2Uuc2V0RGlyZWN0aW9uKCdyaWdodCcpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdFxyXG5cdFx0XHRjYXNlICd3JzpcclxuXHRcdFx0Y2FzZSAnQXJyb3dVcCc6XHJcblx0XHRcdFx0c25ha2Uuc2V0RGlyZWN0aW9uKCd1cCcpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0Y2FzZSAncyc6XHJcblx0XHRcdGNhc2UgJ0Fycm93RG93bic6XHJcblx0XHRcdFx0c25ha2Uuc2V0RGlyZWN0aW9uKCdkb3duJyk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHR9XHJcblx0fTtcclxufVxyXG5cclxuZnVuY3Rpb24gdXBkYXRlKCl7XHJcblx0Z2FtZUZpZWxkLnVwZGF0ZSgpO1xyXG59XHJcblxyXG5zZXRJbnRlcnZhbCgoKSA9PntcclxuXHRzbmFrZS51cGRhdGUoKTtcclxufSwgMTAwKTtcclxubW9kdWxlLmV4cG9ydHMgPSBnYW1lOyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZ3JhcGhpY3MsIHgsIHksIHNpemUpe1xyXG5cdHZhciBjb2xvciA9IDB4ZmZmZmZmO1xyXG5cdHZhciBkZWZhdWx0Q29sb3IgPSBjb2xvcjtcclxuXHR2YXIgY29sb3JDaGFuZ2VkID0gdHJ1ZTtcclxuXHR0aGlzLmRyYXcgPSBmdW5jdGlvbigpe1xyXG5cdFx0aWYoIWNvbG9yQ2hhbmdlZClcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcclxuXHRcdGdyYXBoaWNzLmxpbmVTdHlsZSgxLCAweDAwMDAwMCk7XHJcblx0XHRncmFwaGljcy5iZWdpbkZpbGwoY29sb3IsIDEpO1xyXG5cdFx0Z3JhcGhpY3MuZHJhd1JlY3QoeCwgeSwgc2l6ZSwgc2l6ZSk7XHJcblx0XHRncmFwaGljcy5lbmRGaWxsKCk7XHJcblx0XHRncmFwaGljcy5saW5lU3R5bGUoMCk7XHJcblxyXG5cdFx0Y29sb3JDaGFuZ2VkID0gZmFsc2U7XHJcblx0fVxyXG5cclxuXHR0aGlzLnNldENvbG9yID0gZnVuY3Rpb24obmV3Q29sb3Ipe1xyXG5cdFx0aWYobmV3Q29sb3IgIT0gY29sb3IpXHJcblx0XHRcdGNvbG9yQ2hhbmdlZCA9IHRydWU7XHJcblxyXG5cdFx0Y29sb3IgPSBuZXdDb2xvcjtcclxuXHR9XHJcblxyXG5cdHRoaXMuc2V0RGVmYXVsdENvbG9yID0gZnVuY3Rpb24obmV3Q29sb3Ipe1xyXG5cdFx0aWYobmV3Q29sb3Ipe1xyXG5cdFx0XHRkZWZhdWx0Q29sb3IgPSBuZXdDb2xvcjtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHRoaXMucmVzZXRDb2xvciA9IGZ1bmN0aW9uKCl7XHJcblx0XHR0aGlzLnNldENvbG9yKGRlZmF1bHRDb2xvcik7XHJcblx0fVxyXG59OyIsInZhciBzcXVhcmUgPSByZXF1aXJlKCcuL3NxdWFyZScpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihncmFwaGljcywgeCwgeSwgaWQsIHNpemUpe1xyXG5cdC8vY2xhc3MgbWV0aG9kcyBhbmQgcHJvcGVydGllc1xyXG5cdHRoaXMueCA9IHg7XHJcblx0dGhpcy55ID0geTtcclxuXHR0aGlzLmlkID0gaWQ7XHJcblx0dGhpcy5oYXNGb29kID0gZmFsc2U7XHJcblx0dGhpcy5oYXNTbmFrZSA9IGZhbHNlO1xyXG5cdHRoaXMuZ3JhcGhpYyA9IG5ldyBzcXVhcmUoXHJcblx0XHRncmFwaGljcyxcclxuXHRcdHgsXHJcblx0XHR5LFxyXG5cdFx0c2l6ZVxyXG5cdCk7XHJcblxyXG5cdHRoaXMuc2V0Rm9vZCA9IGZ1bmN0aW9uKCl7XHJcblx0XHR0aGlzLmhhc1NuYWtlID0gZmFsc2U7XHJcblx0XHR0aGlzLmhhc0Zvb2QgPSB0cnVlO1xyXG5cdFx0dGhpcy5ncmFwaGljLnNldENvbG9yKDB4ZmYwMDAwKTtcclxuXHR9O1xyXG5cclxuXHR0aGlzLnNldFNuYWtlID0gZnVuY3Rpb24oKXtcclxuXHRcdHRoaXMuaGFzU25ha2UgPSB0cnVlO1xyXG5cdFx0dGhpcy5oYXNGb29kID0gZmFsc2U7XHJcblx0XHR0aGlzLmdyYXBoaWMuc2V0Q29sb3IoMHgwMGZmMDApO1xyXG5cdH07XHJcblxyXG5cdHRoaXMuc2V0RW1wdHkgPSBmdW5jdGlvbigpe1xyXG5cdFx0dGhpcy5oYXNGb29kID0gZmFsc2U7XHJcblx0XHR0aGlzLmhhc1NuYWtlID0gZmFsc2U7XHJcblx0XHR0aGlzLmdyYXBoaWMucmVzZXRDb2xvcigpO1xyXG5cdH07XHJcbn0iLCJ2YXIgVGlsZSA9IHJlcXVpcmUoJy4vdGlsZScpXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGdyYXBoaWNzLCBncmlkU2l6ZSwgd2lkdGgsIGhlaWdodCl7XHJcblx0dmFyIHRpbGVzID0gW107XHJcblxyXG5cdGZvcih2YXIgaSA9IDA7IGkgPCBNYXRoLmZsb29yKHdpZHRoL2dyaWRTaXplKTsgaSsrKXtcclxuXHRcdGZvcih2YXIgaiA9IDA7IGogPCBNYXRoLmZsb29yKGhlaWdodC9ncmlkU2l6ZSk7IGorKyl7XHJcblx0XHRcdHZhciB0ID0gbmV3IFRpbGUoXHJcblx0XHRcdFx0Z3JhcGhpY3MsXHJcblx0XHRcdFx0aSpncmlkU2l6ZSxcclxuXHRcdFx0XHRqKmdyaWRTaXplLFxyXG5cdFx0XHRcdHRpbGVzLmxlbmd0aCxcclxuXHRcdFx0XHRncmlkU2l6ZVxyXG5cdFx0XHQpO1xyXG5cdFx0XHR0aWxlcy5wdXNoKHQpO1xyXG5cdFx0XHR0LmdyYXBoaWMuc2V0RGVmYXVsdENvbG9yKChpKzEpKjB4ZmZmZjAwKTtcclxuXHRcdFx0dC5ncmFwaGljLnJlc2V0Q29sb3IoKTtcclxuXHRcdFx0dC5ncmFwaGljLmRyYXcoKTtcclxuXHRcdH1cclxuXHR9XHJcblx0XHJcblx0dmFyIHRlc3QgPSAwO1xyXG5cdHRoaXMudXBkYXRlID0gZnVuY3Rpb24oKXtcclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCB0aWxlcy5sZW5ndGg7IGkrKyl7XHJcblx0XHRcdHRpbGVzW2ldLmdyYXBoaWMuZHJhdygpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0dGhpcy53aWR0aCA9IHdpZHRoO1xyXG5cdHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xyXG5cdHRoaXMuY29sdW1uc0NvdW50ID0gZnVuY3Rpb24oKXtcclxuXHRcdHJldHVybiBNYXRoLmZsb29yKHdpZHRoL2dyaWRTaXplKTtcclxuXHR9XHJcblxyXG5cdHRoaXMubGluZXNDb3VudCA9IGZ1bmN0aW9uKCl7XHJcblx0XHRyZXR1cm4gTWF0aC5mbG9vcihoZWlnaHQvZ3JpZFNpemUpO1xyXG5cdH07XHJcblxyXG5cdHRoaXMudGlsZXMgPSB0aWxlcztcclxufSJdfQ==
