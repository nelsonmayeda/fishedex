module.exports = function(config){
	config.set({
		urlRoot:'http://localhost:4444',
		basePath : '../../../', // site/test/unit/config(thisfolder) 
		
		reporters: ['progress', 'html'],
		htmlReporter: {
			outputFile: 'test/unit/output/index.html', // where to put the report output 
			groupSuites: true,//grouped under topmost describe, slightly indent sub describes
		},

		files : [
			'src/Lib/angular.js', //load angular first
			'src/Lib/angular-ui-router.js',
			'src/Lib/angular-animate.js',
			'node_modules/angular-mocks/angular-mocks.js',//test support
			'src/Environment/src.js', //environment test settings
			'src/App/**/*module.js', //modules first
			'src/App/**/*filters.js', 
			'src/App/**/*providers.js', 
			'src/App/**/*controllers.js', 
			'src/App/**/*services.js', 
			'src/App/**/*component.js', 
			'src/App/**/!(*.min).js', //don't double load .min files
			'test/pages/test.module.js', //splitting off a new app.test module for using templatecache
			'test/pages/htmlAppBundle.min.js', //html templatecache, note that grunt builds this version for module app.test
			'test/unit/spec/**/*.spec.js'//tests
			/*
			'test/unit/spec/app.module.spec.js',
			'test/unit/spec/app.component.spec.js',
			'test/unit/spec/Account/account.module.spec.js',
			'test/unit/spec/Account/account.controllers.spec.js',
			'test/unit/spec/Account/account.services.spec.js',
			'test/unit/spec/Animate/animate.module.spec.js',
			'test/unit/spec/Fish/fish.module.spec.js',
			'test/unit/spec/Fish/fish.controllers.spec.js',
			'test/unit/spec/Fish/fish.services.spec.js',
			'test/unit/spec/Home/home.module.spec.js',
			'test/unit/spec/Home/home.controllers.spec.js',
			'test/unit/spec/Lists/lists.module.spec.js',
			'test/unit/spec/Lists/lists.controllers.spec.js',
			'test/unit/spec/Lists/lists.services.spec.js',
			'test/unit/spec/Species/species.module.spec.js',
			'test/unit/spec/Species/species.controllers.spec.js',
			'test/unit/spec/Species/species.services.spec.js',
			'test/unit/spec/Shared/shared.module.spec.js',
			'test/unit/spec/Shared/shared.filters.spec.js',
			'test/unit/spec/Shared/shared.providers.spec.js',
			'test/unit/spec/Shared/shared.services.spec.js',
			'test/unit/spec/Shared/Footer/footer.component.spec.js',
			'test/unit/spec/Shared/Header/header.component.spec.js',
			*/
		],
		frameworks: ['jasmine'],//this is actually jasmine2
		singleRun: true, //false to allow debug. click debug button, will open new tab, inspect, find debug source file, add breakpoints, refresh page
		browsers : ['Chrome'],

		plugins : [
				'karma-chrome-launcher',
				'karma-jasmine',
				'karma-htmlfile-reporter'
				]
	});
};
