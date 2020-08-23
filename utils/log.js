let currentStep = 0;
let indentation = 0;
function logSectionStart(...args) {
	let str = [...args, "-".repeat(40)].join("");
	if (str.length > 40) {
		// Remove lines from the end
		str = str.substring(0, 40);
	}
	console.log(str, "\n\n");
}
function logSectionEnd(...args) {
	let str = ["-".repeat(40), "DONE", "-----", ...args].join("");
	if (str.length > 40) {
		// Remove lines from the start
		str = str.substring(str.length - 40);
	}
	console.log("\n", str);
}
function logStep(...args) {
	console.log(currentStep, "-", ...args);

	indentation += 1;
}
function logStepDone() {
	console.log(currentStep, "-", "DONE");
	currentStep++;

	indentation -= 1;
}

function log(...args) {
	let indent = Array.from({ length: indentation * 5 }, () => "").join(" ");
	console.log(indent, "-", ...args);
}

function logLines(lines) {
	if (lines.length === 0) return;

	let breaks = lines.split("\n");
	breaks.forEach((line) => {
		if (line.length === 0) return;
		log(line.trim());
	});
}

module.exports = {
	logSectionStart,
	logSectionEnd,
	logStep,
	logStepDone,
	log,
	logLines,
};
