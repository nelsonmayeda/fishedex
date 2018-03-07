//High Quality GIF helper for FFMPEG
//Takes a video
//Creates a palette
//Uses palette to create a HQ GIF
var mkdirp = require('mkdirp');
var path = require('path');
var spawn = require("child_process").spawn;
var ffmpegPath = require('ffmpeg-binaries').ffmpegPath();

var videoHelper = function() {
	var recorder,filepath;
	this.start = function(input, outputPath, done) {
		var dir = path.dirname(outputPath);
		mkdirp(dir);
		console.log('start recorder');
		filepath=outputPath;//save reference for use later
		recorder = spawn(ffmpegPath, [
			'-y', //overwrite output file
			'-f', 'gdigrab',//input device: gdigrab is windows screenshot
			'-i', input,//input source: process.env.DISPLAY || 'desktop' || 'title=<windowname>'
			'-q:v','10',//output bits per frame rate (VBR), 0 lossless, 51 worst, same as crf but usage depends on codec
			filepath+'.avi' //output file
		]);
		recorder.stderr.on('data', function (data) {
			console.log('ffmpeg data: ' + data);
		});
		recorder.on('close', function (code) {
			console.log('ffmpeg exited with code: ' + code);
		});
		done(); 
	};
	var createPalette=function(done){
		console.log('start palette');
		recorder = spawn(ffmpegPath, [
			'-y', //overwrite output file
			'-i', filepath+'.avi',
			'-vf','fps=10,scale=640:-1:flags=lanczos,palettegen',
			filepath+'.png' //output file
		]);
		recorder.stderr.on('data', function (data) {
			console.log('ffmpeg data: ' + data);
		});
		recorder.on('close', function (code) {
			console.log('ffmpeg exited with code: ' + code);
			setTimeout(function(){ 
				createGif(done);
			}, 2000);
		});
	};
	var createGif=function(done){
		console.log('start gif');
		
		recorder = spawn(ffmpegPath, [
			'-y', //overwrite output file
			'-i', filepath+'.avi',
			'-i', filepath+'.png',
			'-filter_complex','fps=10,scale=640:-1:flags=lanczos[x];[x][1:v]paletteuse',
			filepath+'.gif' //output file
		]);
		recorder.stderr.on('data', function (data) {
			console.log('ffmpeg data: ' + data);
		});
		recorder.on('close', function (code) {
			console.log('ffmpeg exited with code: ' + code);
			done(); 
		});
	};
	var killRecorder = function() {
		if (recorder) {
			recorder.kill();// Stop ffmpeg
		}
		recorder = null;
	};
	this.stop = function(done) {
		console.log('stop recorder');
		killRecorder();
		//note there is a slight delay from when browser changes title to ffmpeg can find that window
		setTimeout(function(){ 
			createPalette(done);
		}, 2000);
	};
};  

module.exports = new videoHelper();