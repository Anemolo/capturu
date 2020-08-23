const { execSync } = require("child_process");
const { logLines } = require("./log");

function getLatestGitCommitHash() {
	return execSync("git rev-parse HEAD").toString().trim();
}

function commit(message) {
	return new Promise((res, reject) => {
		commands = ["git add .", `git commit -am \"${message}\"`];

		commands.forEach((command) => {
			let out = execSync(command);
			logLines(out.toString());
		});

		res();
	});
}

module.exports = { getLatestGitCommitHash, commit };
