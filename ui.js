"use strict";
const React = require("react");
const { useState, useEffect, useContext } = require("react");
const { Text, Box, useInput } = require("ink");
const useInterval = require("./useInteval");
const importJsx = require("import-jsx");
const EndScreen = importJsx("./endScreen.js");
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

	if (collidesWithFood(newHead, foodItem)) {
		foodItem = {
			x: Math.floor(Math.random() * FIELD_SIZE),
			y: Math.floor(Math.random() * FIELD_SIZE),
		};
		return [newHead, ...segments];
	}
	return [newHead, ...segments.slice(0, -1)];
}

function collidesWithFood(head, foodItem) {
	return head.x === foodItem.x && head.y == foodItem.y;
}

const App = () => {
	const [snakeSegments, setSnakeSegments] = useState([
		{ x: 8, y: 8 },
		{ x: 8, y: 7 },
		{ x: 8, y: 6 },
	]);

	const [direction, setDirection] = useState(Direction.LEFT);

	useInput((input, key) => {
		if (input === "q") {
			exit();
		}

		if (key.leftArrow) {
			setDirection(Direction.LEFT);
		}

		if (key.rightArrow) {
			setDirection(Direction.RIGHT);
		}

		if (key.upArrow) {
			setDirection(Direction.TOP);
		}

		if (key.downArrow) {
			setDirection(Direction.B0TTON);
		}
	});

	const [head, ...tail] = snakeSegments;

	const intersectsWithItself = tail.some(
		(segment) => segment.x === head.x && segment.y === head.y
	);

	useInterval(
		() => {
			setSnakeSegments((segments) => newSnakePosition(segments, direction));
		},
		intersectsWithItself ? null : 50
	);

	return (
		<Box flexDirection="column" alignItems="center">
			<Text>
				<Text color="green">Snake</Text> Game
			</Text>
			{intersectsWithItself ? (
				<EndScreen size={FIELD_SIZE} />
			) : (
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
			)}
		</Box>
	);
};

module.exports = App;
