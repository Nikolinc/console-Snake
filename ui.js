"use strict";
const React = require("react");
const { useState } = require("react");
const { Text, Box } = require("ink");
const FIELD_SIZE = 16;
const FIELD_ROW = [...new Array(FIELD_SIZE).keys()];

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

const App = () => {
	const [snakeSegments, setSnakeSegments] = useState([
		{ x: 8, y: 8 },
		{ x: 8, y: 7 },
		{ x: 8, y: 6 },
	]);

	return (
		<Box flexDirection="column" alignItems="center">
			<Text>
				<Text color="green">Snake</Text> Game
			</Text>
			<Box flexDirection="column">
				{FIELD_ROW.map((y) => (
					<Box key={y}>
						{FIELD_ROW.map((x) => (
							<Box key={x}>
								<Text>{getItem(x, y, snakeSegments) || " . "}</Text>
							</Box>
						))}
					</Box>
				))}
			</Box>
		</Box>
	);
};

module.exports = App;
