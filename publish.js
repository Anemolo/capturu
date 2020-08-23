const program = require("commander");
const { publishToVercel } = require("./utils");

program
	.arguments("[name]")
	.action((name) => {
		publishToVercel(name);
	})
	.parse(process.argv);

module.exports = {
	publishToVercel()
}
