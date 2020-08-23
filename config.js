const path = require("path");
const fs = require("fs-extra");

/**
 *
 *
 * Things this can't live without
 * ShareXConfig
 * ShareXCMD
 */
let cwd = process.cwd();

let projectOptions = {
	prefix: "c",
	output: "output",
	shareXWorkflow: "record-commit",
};

let packagejsonPath = path.resolve(cwd, "package.json");
if (fs.pathExistsSync(packagejsonPath)) {
	let packageJSON = JSON.parse(fs.readFileSync(packagejsonPath));
	if (packageJSON.capturu) {
		projectOptions = Object.assign(projectOptions, packageJSON.capturu);
	}
}
let config = {
	paths: {
		captureData: path.resolve(cwd, projectOptions.output, "./captureData.json"),
		tempShareXConfig: path.resolve(__dirname, "./temp_ApplicationConfig.json"),
		outputFolder: path.resolve(cwd, projectOptions.output),
		vercelCMD: path.resolve(__dirname, "node_modules", ".bin", "vercel.cmd"),
		shareXConfig:
			"C:\\Users\\Daniel\\Documents\\ShareX\\ApplicationConfig.json",
		shareXCMD: 'C:\\"Program Files"\\ShareX\\ShareX.exe',
	},
	prefix: projectOptions.prefix,
	shareXWorkflow: projectOptions.shareXWorkflow,
};

module.exports = config;
