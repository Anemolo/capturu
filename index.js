#!/usr/bin/env node
const program = require("commander");
const { publishToVercel } = require("./utils");
const { capture } = require("./capture");
const fs = require("fs-extra");
const path = require("path");

const { paths } = require("./config");

program
	.arguments("[name]")
	.option("-d|--deploy", "Publish to vercel")
	.option("-w|--workflow <workflow>", "ShareX workflow")
	.action((name) => {
		// For some reason the " messes with path exist. But not wwhen using it to call the .exe
		if (!fs.pathExistsSync(paths.shareXCMD.replace(/"/g, ""))) {
			console.error(
				"ERROR: ShareX path doesn't exist.",
				paths.shareXCMD.replace(/"/g, "")
			);
			return;
		}
		if (!fs.pathExistsSync(paths.shareXConfig)) {
			console.error(
				"ERROR: ShareX application config path doesn't exist.",
				paths.shareXConfig
			);
			return;
		}
		if (!fs.pathExistsSync(path.resolve(process.cwd(), ".git"))) {
			console.error("ERROR: Git hasn't been initialized.");
		}
		capture({
			publish: program.publish,
			name,
			workflow: program.workflow,
		});
	});

program
	.command("deploy")
	.arguments("[name]")
	.action((name) => {
		publishToVercel(name);
	});

program.parse(process.argv);
