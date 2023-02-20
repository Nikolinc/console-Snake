"use strict";
const React = require("react");
const { Text, Box, Color } = require("ink");
const FIELD_SIZE = 16;
const FIELD_ROW = [...new Array(FIELD_SIZE).keys()];

const App = () => (
	<Box flexDirection="column" alignItems="center">
		<Text>
			<Text color="green">Snake</Text> Game
		</Text>
		<Box flexDirection="column">
			{FIELD_ROW.map((y) => (
				<Box key={y}>
					{FIELD_ROW.map((x) => (
						<Box key={x}>
							<Text> . </Text>
						</Box>
					))}
				</Box>
			))}
		</Box>
	</Box>
);

module.exports = App;
