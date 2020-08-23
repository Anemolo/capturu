const fs = require("fs");
const { exec } = require("child_process");
const program = require("commander");
const defaults = require("object.defaults");
const { paths, ...config } = require("../config");
const { logSectionStart, logSectionEnd } = require("../utils");
const { afterCapture } = require("./afterCapture");
const { beforeCapture } = require("./beforeCapture");

function shareXRecord({ workflow }) {
	console.log(workflow);
	return new Promise((res, rej) => {
		exec(
			`${paths.shareXCMD} -workflow \"${workflow}\" -autoclose -m -nohotkeys -s`,
			(err, results) => {
				res();
			}
		);
	});
}

async function capture(options) {
	defaults(options, {
		publish: false,
		name: null,
		workflow: config.shareXWorkflow,
	});

	await beforeCapture(options);

	logSectionStart("CAPTURING");
	await shareXRecord({
		workflow: options.workflow,
	});
	logSectionEnd("CAPTURING");

	await afterCapture(options);
}

module.exports = {
	capture,
};
