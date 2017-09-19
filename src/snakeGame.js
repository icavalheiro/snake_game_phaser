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