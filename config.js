const path = require("path");
const fs = require("fs");

let cwd = process.cwd();

let packageJSON = JSON.parse(
	fs.readFileSync(path.resolve(cwd, "package.json"))
);

let projectOptions = {
	prefix: "c",
	output: "output",
};

if (packageJSON.capturu) {
	projectOptions = Object.assign(projectOptions, packageJSON.capturu);
}
let config = {
	paths: {
		captureData: path.resolve(cwd, "./captureData.json"),
		tempShareXConfig: path.resolve(__dirname, "./temp_ApplicationConfig.json"),
		outputFolder: path.resolve(cwd, projectOptions.output),
		shareXConfig:
			"C:\\Users\\Daniel\\Documents\\ShareX\\ApplicationConfig.json",
		vercelCMD: "C:\\Users\\Daniel\\AppData\\Roaming\\npm\\vercel.cmd",
		shareXCMD: 'C:\\"Program Files"\\ShareX\\ShareX.exe',
	},
	prefix: projectOptions.prefix,
	shareXWorkflow: "record-commit",
};

module.exports = config;
