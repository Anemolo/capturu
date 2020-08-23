const { exec, execSync, spawn } = require("child_process");
const chalk = require("chalk");

const { paths, ...config } = require("../config");

const { log, logStepDone, logStep, logLines } = require("./log");

function createVercelPage() {
	return new Promise((res, rej) => {
		let ls = spawn(paths.vercelCMD);

		let url = null;

		ls.stderr.on("data", (data) => {
			log(`Vercel: ${data}`.replace("\n", "").replace("\\n", "").trim());
		});

		ls.stdout.on("data", (data) => {
			url = data;
			log(`Vercel out: ${data}`);
		});

		ls.on("close", (code) => {
			log(`Vercel Done: Code ${code} ${url}`);

			res(url.toString());
		});
	});
}

function setVercelAlias(url, name) {
	let targetURL = `${config.prefix}-${name}.vercel.app`;
	return new Promise((res, rej) => {
		exec(`${paths.vercelCMD} alias ${url} ${targetURL}`, (err, out) => {
			if (err) {
				return res(err);
			}
			logLines(out);
			res(targetURL);
		});
	});
}

function getGitCommitHash() {
	return execSync("git rev-parse HEAD").toString().trim();
}

async function publishToVercel(name) {
	if (name == null) {
		name = getGitCommitHash().substring(0, 7);
	}
	logStep("Creating Vercel Page");
	let url = await createVercelPage();
	logStepDone();

	logStep(`Aliasing Vercel URL to: ${name}`);
	let targetURL = await setVercelAlias(url, name);
	log(
		chalk.bold("Published on:"),
		chalk.bold.white.inverse(`  https://${targetURL}  `)
	);
	logStepDone();
}

module.exports = {
	publishToVercel,
};
