'use strict';
//Take a screenshot of all routes
//Both desktop and mobile versions
//Both auth and unauth versions
var screenshotHelper = requireHelper('screenshotHelper.js');
var loginHelper = requireHelper('loginHelper.js');
var routes = [
	'/',
	'/Lists/1/FishEDex',
	'/Lists/1/Leaderboard',
	'/Lists',
	'/Lists/Create',
	'/Lists/1',
	'/Lists/1/Edit',
	'/Lists/1/Delete',
	'/Fish',
	'/Fish/Create',
	'/Fish/1',
	'/Fish/1/Edit',
	'/Fish/1/Delete',
	'/Fish/Search?Title=Test',
	'/Lists/1/SpeciesCreate',
	'/Species/1',
	'/Species/1/Edit',
	'/Species/1/Delete',
	'/Account',
	'/Account/Login',
	'/Account/Register',
	'/Account/LogOut',
	'/Account/ForgotPassword',
	'/Account/ResetPassword',
	'/Account/ChangePassword',
	'/Account/ChangeEmail',
	'/Account/ConfirmEmail',
	'/whatever',
	'/About',
	'/Contact',
	'/Privacy'
];
describe('E2E TEST - UNAUTH routes', function() {
	describe('UNAUTH desktop', function() {
		beforeEach(function () {
			var width = 1366;
			var height = 768;
			browser.driver.manage().window().setSize(width, height);
		});
		routes.forEach(function(route){
			it('should load d.'+route+'', function(done) {
				browser.get(route);
				var path = 'test/e2e/output/screenshots/unauth_d_'+route.replace(/[\\/:"*?<>|]/g, "_") + ".png";
				var helper = new screenshotHelper();
				setTimeout(function(){ helper.takeScreenshot(path); done();}, 1000);
			});
		});
	});
	
	describe('UNAUTH mobile', function() {
		beforeEach(function () {
			var width = 720;
			var height = 1280;
			browser.driver.manage().window().setSize(width, height);
		});
		routes.forEach(function(route){
			it('should load m.'+route+'', function(done) {
				browser.get(route);
				var path = 'test/e2e/output/screenshots/unauth_m_'+route.replace(/[\\/:"*?<>|]/g, "_") + ".png";
				var helper = new screenshotHelper();
				setTimeout(function(){ helper.takeScreenshot(path); done();}, 1000);
			});
		});
	});
});
describe('E2E TEST - AUTH routes', function() {
	describe('AUTH desktop', function() {
		beforeEach(function () {
			var width = 1366;
			var height = 768;
			browser.driver.manage().window().setSize(width, height);
			loginHelper.login('testAccount','testPassword0');
		});
		routes.forEach(function(route){
			it('should load d.'+route+'', function(done) {
				browser.get(route);
				var path = 'test/e2e/output/screenshots/auth_d_'+route.replace(/[\\/:"*?<>|]/g, "_") + ".png";
				var helper = new screenshotHelper();
				setTimeout(function(){ helper.takeScreenshot(path); done();}, 1000);
			});
		});
	});
	
	describe('AUTH mobile', function() {
		beforeEach(function () {
			var width = 720;
			var height = 1280;
			browser.driver.manage().window().setSize(width, height);
			loginHelper.login('testAccount','testPassword0');
		});
		routes.forEach(function(route){
			it('should load m.'+route+'', function(done) {
				browser.get(route);
				var path = 'test/e2e/output/screenshots/auth_m_'+route.replace(/[\\/:"*?<>|]/g, "_") + ".png";
				var helper = new screenshotHelper();
				setTimeout(function(){ helper.takeScreenshot(path); done();}, 1000);
			});
		});
	});
});