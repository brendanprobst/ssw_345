var esprima = require("esprima");
var options = { tokens: true, tolerant: true, loc: true, range: true };
var fs = require("fs");

function staticAnalysis(filePath) {
	var buf = fs.readFileSync(filePath, "utf8");
	var ast = esprima.parse(buf, options);
	// console.log(ast);
	var file = new fileBuilder();
	file.name = filePath;

	traverseWithParents(ast, function (node) {
		if (node.type === "Literal") {
			file.strings++;
		}
		if (node.type === "FunctionDeclaration") {
			var newFunction = new FunctionBuilder();
			newFunction.FunctionName = functionName(node);
			newFunction.ParameterCount = node.params.length;
			newFunction.StartLine = node.loc.start.line;
			traverseWithParents(node, function () {});
		}
	});

	file.report();
}
function fileBuilder() {
	this.fileName = "";
	this.strings = 0;
	this.importCounts = 0;

	this.report = () => {
		console.log(this.fileName + ", " + this.strings);
	};
}
function traverseWithParents(object, visitor) {
	var key, child;

	visitor.call(null, object);

	for (key in object) {
		if (object.hasOwnProperty(key)) {
			child = object[key];
			if (typeof child === "object" && child !== null && key != "parent") {
				child.parent = object;
				traverseWithParents(child, visitor);
			}
		}
	}
}
// Helper function for printing out function name.
function functionName(node) {
	if (node.id) {
		return node.id.name;
	}
	return "anon function @" + node.loc.start.line;
}

function FunctionBuilder() {
	this.StartLine = 0;
	this.FunctionName = "";
	// The number of parameters for functions
	(this.ParameterCount = 0),
		// Number of if statements/loops + 1
		(this.SimpleCyclomaticComplexity = 0);
	// The max depth of scopes (nested ifs, loops, etc)
	this.MaxNestingDepth = 0;
	// The max number of conditions if one decision statement.
	this.MaxConditions = 0;

	this.report = function () {
		console.log(
			n(
				"{0}(): {1}\n" +
					"============\n" +
					"SimpleCyclomaticComplexity: {2}\t" +
					"MaxNestingDepth: {3}\t" +
					"MaxConditions: {4}\t" +
					"Parameters: {5}\n\n"
			).format(
				this.FunctionName,
				this.StartLine,
				this.SimpleCyclomaticComplexity,
				this.MaxNestingDepth,
				this.MaxConditions,
				this.ParameterCount
			)
		);
	};
}
staticAnalysis("demo.js");
