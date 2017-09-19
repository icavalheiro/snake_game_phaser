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