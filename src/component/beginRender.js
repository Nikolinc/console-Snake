

let foodItem = {
	x: Math.floor(Math.random() * FIELD_SIZE),
	y: Math.floor(Math.random() * FIELD_SIZE),
};

function getItem(x, y, snakeSegments) {
	if (foodItem.x === x && foodItem.y === y) {
		return <Text color="red"> ♥ </Text>;
	}

	for (const segment of snakeSegments) {
		if (segment.x === x && segment.y === y) {
			return <Text color="green"> ■ </Text>;
		}
	}
}