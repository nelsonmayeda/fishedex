var path = require('path');
var basePath =path.join(process.cwd(), '/test');
exports.config = {
	baseUrl: 'http://localhost:4444',
	directConnect: true, //no selenium server, only use browser on this machine with no specific settings,
	//NOTE that restartBrowserBetweenTests is intermittently buggy, open issue on github
	//restartBrowserBetweenTests: true,//with incognito: flush any remaining client logins,actions,etc
	framework: 'jasmine2',
	capabilities: {
		'browserName': 'chrome',
		'chromeOptions': {
			'args': [
				'incognito', //flush cookies, localstorage, localdb, cache
				'--disable-extensions',
				'--disable-infobars',//popup "chrome is being controlled"
				'--disable-gpu'//messes with screenshot/video recording
				]
		},
		loggingPrefs: {
			browser: "ALL" //console.log,console.warn,console.error
		}
	},
	specs: ['../scenario/video.scenario.js'],
	onPrepare:function(){
		//for require relative paths
		global.requirePO = function (relativePath) {
            return require(path.join(basePath,'/pages',relativePath));
        };
		global.requireHelper = function (relativePath) {
            return require(path.join(basePath,'/e2e/config',relativePath));
        };
		browser.driver.manage().window().maximize();
	}

};