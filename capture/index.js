const fs = require("fs");
const { exec } = require("child_process");
const program = require("commander");
const { paths, ...config } = require("../config");
const { logSectionStart, logSectionEnd } = require("../utils");
const { afterCapture } = require("./afterCapture");
const { beforeCapture } = require("./beforeCapture");

// program
// 	.arguments("[name]")
// 	.option("-p|--publish", "Publish to vercel")
// 	.action((name) => {
// 		init({
// 			publish: program.publish,
// 			name,
// 		});
// 	})
// 	.parse(process.argv);

function shareXRecord() {
	return new Promise((res, rej) => {
		exec(
			`${paths.shareXCMD} -workflow \"${config.shareXWorkflow}\" -autoclose -m -nohotkeys -s`,
			(err, results) => {
				res();
			}
		);
	});
}

async function capture(options) {
	beforeCapture(options);

	logSectionStart("CAPTURING");
	await shareXRecord();
	logSectionEnd("CAPTURING");

	afterCapture(options);
}

module.exports = {
	capture,
};
