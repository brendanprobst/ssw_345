var chai = require("chai");
var assert = chai.assert,
	expect = chai.expect;
var main = require("../analysis.js");

describe("Sanity check", function () {
	describe("runs", function () {
		it("doesn't crash", function () {
			main.complexity("analysis.js");
		});
	});
});

describe("Strings: ", function () {
	it("Strings in mystery.js is 19.", function () {
		main.complexity("analysis.js");
		let stringCount = main.getStrings();
		assert.equal(19, stringCount);
	});
});
