const log = require("./log");
const vercel = require("./vercel");
const git = require("./git");
const randomWords = require("random-words");
const fs = require("fs-extra");
const { paths } = require("../config");

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

async function getCaptureData() {
	try {
		await fs.ensureFile(paths.captureData);
		// console.log(app;
	} catch (err) {
		console.log("err", err);
	}
	let captureDataRAW = fs.readFileSync(paths.captureData);
	let captureData = { index: 0, needsReset: false, latestName: "none" };
	try {
		captureData = Object.assign(captureData, JSON.parse(captureDataRAW));
	} catch (err) {
		// captureData =
	}
	return captureData;
}

module.exports = {
	...log,
	...vercel,
	...git,
	generateName,
	getCaptureData,
};
