const fs = require("fs");

const {
	commit,
	logSectionEnd,
	logSectionStart,
	logStep,
	logStepDone,
	publishToVercel,
	getCaptureData,
} = require("../utils");
const { paths } = require("../config");

let captureData;

function resetShareXToDefault() {
	let rawdata = fs.readFileSync(paths.tempShareXConfig);
	fs.writeFileSync(paths.shareXConfig, rawdata);
	fs.unlinkSync(paths.tempShareXConfig);
}

function updateCaptureData() {
	captureData.index += 1;
	captureData.needsReset = false;
	fs.writeFileSync(paths.captureData, JSON.stringify(captureData));
}

async function afterCapture(options = {}) {
	captureData = await getCaptureData();
	logSectionStart("AFTER RECORD");
	if (captureData.needsReset) {
		logStep("Resetting ShareX data.");
		resetShareXToDefault();
		logStepDone();

		logStep("Updating capture data.");
		updateCaptureData();
		logStepDone();

		logStep("Commiting changes");
		await commit(`Screenshot: ${captureData.latestName}`);
		logStepDone();

		if (options.publish) await publishToVercel(captureData.latestName);
	}

	logSectionEnd("AFTER RECORD");
}

module.exports = {
	afterCapture,
};
