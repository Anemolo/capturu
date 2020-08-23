#!/usr/bin/env node
const program = require("commander");
const { publishToVercel } = require("./utils");
const { capture } = require("./capture");

program
	.arguments("[name]")
	.option("-d|--deploy", "Publish to vercel")
	.action((name) => {
		// console.log(process.cwd());
		capture({
			publish: program.publish,
			name,
		});
	});

program
	.command("deploy")
	.arguments("[name]")
	.action((name) => {
		publishToVercel(name);
	});

program.parse(process.argv);
