var specReporter = require('protractor-html-reporter');
var path = require('path');
var basePath =path.join(process.cwd(), '/test');
exports.config = {
	baseUrl: 'http://localhost:4444',
	directConnect: true, //no selenium server, only use browser on this machine with no specific settings,
	//NOTE that restartBrowserBetweenTests is intermittently buggy, fails saying no valid session id. open issue on github
	//restartBrowserBetweenTests: true,//with incognito: flush any remaining client logins,actions,etc
	framework: 'jasmine2',
	capabilities: {
		'browserName': 'chrome',
		'chromeOptions': {
			'args': [
				//'incognito', //flush cookies, localstorage, localdb, cache
				//'--headless',
				//'--disable-gpu'//required for headless
				]
		},
		loggingPrefs: {
			browser: "ALL" //console.log,console.warn,console.error
		}
	},
	stackTrace: false,
	//paths relative to this config file site/test/e2e/config|spec
	specs: ['../spec/Fish/fish.spec.js'],
	onPrepare: function () {
		//for require relative paths
		global.requirePO = function (relativePath) {
            return require(path.join(basePath,'/pages',relativePath));
        };
		global.requireHelper = function (relativePath) {
            return require(path.join(basePath,'/e2e/config',relativePath));
        };
		browser.driver.manage().window().maximize();
		require('jasmine-expect');
		/*
		jasmine.getEnv().addReporter(new specReporter({
			takeScreenshots: false,
			cleanDestination: false, //deletes everything in folder
			savePath: './test/e2e/output/html/'//note that this folder gets deleted every time...
		}));
		*/
		var jasmineReporters = require('jasmine-reporters');
		jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
			consolidateAll: true,
			savePath: './test/e2e/output/html/',
			filePrefix: 'xmlresults'
		}));
	},
	onComplete: function() {
     var browserName, browserVersion;
     var capsPromise = browser.getCapabilities();
 
     capsPromise.then(function (caps) {
        browserName = caps.get('browserName');
        browserVersion = caps.get('version')+' - '+caps.get('chrome');
 
        testConfig = {
            reportTitle: 'E2E Test Results',
            outputPath: './test/e2e/output/html/',
            screenshotPath: './test/e2e/output/screenshots',
			screenshotOnExpectFailure:false,
			screenshotOnSpecFailure:false,
            testBrowser: browserName,
            browserVersion: browserVersion,
            modifiedSuiteName: false,
            screenshotsOnlyOnFailure: true
        };
        new specReporter().from('./test/e2e/output/html/xmlresults.xml', testConfig);
    });
 }
};