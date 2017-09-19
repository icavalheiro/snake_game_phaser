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