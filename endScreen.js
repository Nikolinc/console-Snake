"use stict";

const React = require("react");
const { Text, Box } = require("ink");

module.exports = ({ size }) => (
	<Box
		flexDirection="column"
		height={size}
		width={size}
		alignItems="center"
		justifyContent="center"
	>
		<Text color="red">You died</Text>
	</Box>
);
