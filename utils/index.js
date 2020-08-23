const log = require("./log");
const vercel = require("./vercel");
const git = require("./git");
const randomWords = require("random-words");

function generateName(index, name) {
	if (name == null || (typeof name == "string" && name.length === 0)) {
		name = randomWords({ min: 3, max: 7, join: "-", exactly: 2 });
	}

	index = Number(index);
	if (index < 10) {
		index = `0${index}`;
	}
	return `${index}-${name}`;
}

module.exports = {
	...log,
	...vercel,
	...git,
	generateName,
};
