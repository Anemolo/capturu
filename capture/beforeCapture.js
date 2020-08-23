const fs = require("fs");
const { paths, ...config } = require("../config");
const {
	generateName,
	logSectionStart,
	logSectionEnd,
	logStep,
	logStepDone,
	log,
} = require("../utils");

let state = {
	outputFilename: null,
	captureDataJSON: null,
};

function setupShareXConfig() {
	let appConfigRAW = fs.readFileSync(paths.shareXConfig);

	// Save initial application config
	fs.writeFileSync(paths.tempShareXConfig, appConfigRAW);
	let appConfigJSON = JSON.parse(appConfigRAW);
	// Modify the config to export in this folder
	appConfigJSON.CustomScreenshotsPath = paths.outputFolder;

	// And use my custom name. (ShareX can make automatic names, but this allows me to sync it with everything else)
	appConfigJSON.DefaultTaskSettings.UploadSettings.NameFormatPattern =
		state.outputFilename;
	log("Name:", state.outputFilename);

	fs.writeFileSync(paths.shareXConfig, JSON.stringify(appConfigJSON));
}

function saveCaptureData(name) {
	let captureDataJSON = state.captureDataJSON;
	// let data = fs.readFileSync(path.resolve(__dirname, "../data.json"));
	captureDataJSON.latestName = state.outputFilename;
	captureDataJSON.needsReset = true;
	fs.writeFileSync(paths.captureData, JSON.stringify(captureDataJSON));
}

function beforeCapture(options) {
	logSectionStart("BEFORE CAPTURE");
	state.captureDataJSON = JSON.parse(fs.readFileSync(paths.captureData));
	state.outputFilename = generateName(
		state.captureDataJSON.index,
		options.name
	);

	if (state.outputFilename.length === 0) return;

	logStep("Setting up custom shareX");
	setupShareXConfig();
	logStepDone();

	logStep("Updating Capture data");
	saveCaptureData();
	logStepDone();

	logSectionEnd("BEFORE CAPTURE");
}

module.exports = {
	beforeCapture,
};
