var mkdirp = require('mkdirp');
var path = require('path');
var fs = require('fs');
var screenshotHelper = function() {
	this.takeScreenshot = function(outputPath) {
		var dir = path.dirname(outputPath);
		mkdirp(dir);
		browser.takeScreenshot().then(function(png) {
			//relative to command prompt
			var stream = fs.createWriteStream(outputPath);
			stream.write(new Buffer(png, 'base64'));
			stream.end();
		});
	};
};  

module.exports = screenshotHelper;