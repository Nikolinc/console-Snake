"use strict";
const React = require("react");
const { useState, useEffect, useContext } = require("react");
const { Text, Box, } = require("ink");
const useInterval = require("./useInteval");

const FIELD_SIZE = 16;
const FIELD_ROW = [...new Array(FIELD_SIZE).keys()];

let foodItem = {
	x: Math.floor(Math.random() * FIELD_SIZE),
	y: Math.floor(Math.random() * FIELD_SIZE),
};

const Direction = {
	RIGHT: { x: 1, y: 0 },
	LEFT: { x: -1, y: 0 },
	TOP: { x: 0, y: -1 },
	B0TTON: { x: 0, y: 1 },
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

function limitByField(j) {
	if (j >= FIELD_SIZE) {
		return 0;
	}
	if (j < 0) {
		return FIELD_SIZE - 1;
	}
	return j;
}

function newSnakePosition(segments, direction) {
	const [head] = segments;
	const newHead = {
		x: limitByField(head.x + direction.x),
		y: limitByField(head.y + direction.y),
	};

	return [newHead, ...segments.slice(0, -1)];
}

const App = () => {
	const [snakeSegments, setSnakeSegments] = useState([
		{ x: 8, y: 8 },
		{ x: 8, y: 7 },
		{ x: 8, y: 6 },
	]);

	const [direction, setDirection] = useState(Direction.LEFT);

	// const [stdin, setRawMode] = useContext(StdinContext);

	// useEffect(() => {
	// 	setRawMode(true);
	// 	stdin.on("data", (data) => {
	// 		const value = data.toString();
	// 		if (value == ARROW_UP) {
	// 			setDirection(Direction.TOP);
	// 		}
	// 		if (value == ARROW_DOWN) {
	// 			setDirection(Direction.B0TTON);
	// 		}
	// 		if (value == ARROW_LEFT) {
	// 			setDirection(Direction.LEFT);
	// 		}
	// 		if (value == ARROW_RIGTH) {
	// 			setDirection(Direction.RIGHT);
	// 		}
	// 	});
	// }, []);

	

	useInterval(() => {
		setSnakeSegments((segments) => newSnakePosition(segments, direction));
	}, 50);

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
