'use strict';
//TEST: controllers for account views
//Each controller should exist
//Each controller should have initial scope values
//Each controller should have scope functions
//call init() should call service and change scope.Model
//Each controller should execute scope functions
// with error should change scope.Loading.Error
// with success either redirect or show message
describe('UNIT TEST - account.controllers.js', function() {
	var $httpBackend, $controller, $q, $rootScope;
	function providers($injector) {
		$httpBackend = $injector.get('$httpBackend');
		$controller = $injector.get('$controller');
		$q = $injector.get('$q');
		$rootScope= $injector.get('$rootScope');
	}
	var _accountServices;
	function services($injector) {
		_accountServices = $injector.get('accountServices');
	}
	beforeEach(function () {
		module('account.controllers'); 
		inject(providers); 
		inject(services); 
	});
	///////////////////////
	describe('login controller', function () {
		var ctrl;
		beforeEach(function () {
			ctrl = $controller('loginController', {},{});
			spyOn(ctrl, 'redirect');//stubs function without .and.callThrough();
		});
//Each controller should exist
		it('should exist', function() {
			expect(ctrl).toBeTruthy();//not null or undefined or empty
		});
//Each controller should have initial scope values
		it('should have initial scope values', function() {
			expect(ctrl.Model.userName).toBe('');
			expect(ctrl.Model.password).toBe('');
			expect(ctrl.Model.rememberMe).toBe(false);
		});
//Each controller should have scope functions
		it('should have scope functions', function() {
			expect(typeof ctrl.login).toBe('function');
			expect(typeof ctrl.redirect).toBe('function');
		});
//Each controller should execute scope functions
// with error should change scope.Loading.Error,no redirect
		it('should execute and if failure then show error,no redirect', function() {
			var deferred= $q.defer();
			deferred.reject();
			spyOn(_accountServices, 'login').and.returnValue(deferred.promise);
			 // execute the login function
			ctrl.login();
			// propagate promise resolution to 'then' function using $apply().
			$rootScope.$apply();
			//ensure controller executes failure
			expect(ctrl.Loading.Error).toBe(true);
			expect(ctrl.redirect).not.toHaveBeenCalled();
		});
//Each controller should execute scope functions
// with success redirect
		it('should execute and if successful then redirect', function() {
			var deferred= $q.defer();
			deferred.resolve();
			spyOn(_accountServices, 'login').and.returnValue(deferred.promise);
			 // execute the login function
			ctrl.Model.userName="name";
			ctrl.Model.password="password";
			ctrl.login("name","pw",false);
			// propagate promise resolution to 'then' function using $apply().
			$rootScope.$apply();
			//ensure controller executes success
			expect(ctrl.Loading.Error).toBe(false);
			expect(ctrl.redirect).toHaveBeenCalled();
		});
	});
	///////////////////////
	describe('logout controller', function () {
		var ctrl;
		beforeEach(function () {
			ctrl = $controller('logoutController', {},{});
			spyOn(ctrl, 'redirect');//stubs function without .and.callThrough();
		});
//Each controller should exist
		it('should exist', function() {
			expect(ctrl).toBeTruthy();//not null or undefined or empty
		});
//Each controller should have scope functions
		it('should have scope functions', function() {
			expect(typeof ctrl.logout).toBe('function');
			expect(typeof ctrl.redirect).toBe('function');
		});
//Each controller should execute scope functions
// with error should change scope.Loading.Error,no redirect
		it('should execute and if failure then show error,no redirect', function() {
			var deferred= $q.defer();
			deferred.reject();
			spyOn(_accountServices, 'logout').and.returnValue(deferred.promise);
			 // execute the login function
			ctrl.logout();
			// propagate promise resolution to 'then' function using $apply().
			$rootScope.$apply();
			//ensure controller executes failure
			expect(ctrl.Loading.Error).toBe(true);
			expect(ctrl.redirect).not.toHaveBeenCalled();
		});
//Each controller should execute scope functions
// with success redirect
		it('should execute and if successful then redirect', function() {
			var deferred= $q.defer();
			deferred.resolve();
			spyOn(_accountServices, 'logout').and.returnValue(deferred.promise);
			 // execute the login function
			ctrl.logout();
			// propagate promise resolution to 'then' function using $apply().
			$rootScope.$apply();
			//ensure controller executes success
			expect(ctrl.Loading.Error).toBe(false);
			expect(ctrl.redirect).toHaveBeenCalled();
		});
	});
	///////////////////////
	describe('register controller', function () {
		var ctrl;
		beforeEach(function () {
			ctrl = $controller('registerController', {},{});
			spyOn(ctrl, 'redirect');//stubs function without .and.callThrough();
		});
//Each controller should exist
		it('should exist', function() {
			expect(ctrl).toBeTruthy();//not null or undefined or empty
		});
//Each controller should have initial scope values
		it('should have initial scope values', function() {
			expect(ctrl.Model.userName).toBe('');
			expect(ctrl.Model.email).toBe('');
			expect(ctrl.Model.password).toBe('');
			expect(ctrl.Model.confirmPassword).toBe('');
		});
//Each controller should have scope functions
		it('should have scope functions', function() {
			expect(typeof ctrl.register).toBe('function');
			expect(typeof ctrl.redirect).toBe('function');
		});
//Each controller should execute scope functions
// with error should change scope.Loading.Error,no redirect
		it('should execute and if failure then show error,no redirect', function() {
			var deferred= $q.defer();
			deferred.reject();
			spyOn(_accountServices, 'register').and.returnValue(deferred.promise);
			 // execute the login function
			ctrl.register();
			// propagate promise resolution to 'then' function using $apply().
			$rootScope.$apply();
			//ensure controller executes failure
			expect(ctrl.Loading.Error).toBe(true);
			expect(ctrl.redirect).not.toHaveBeenCalled();
		});
//Each controller should execute scope functions
// with success redirect
		it('should execute and if successful then redirect', function() {
			var deferred= $q.defer();
			deferred.resolve();
			spyOn(_accountServices, 'register').and.returnValue(deferred.promise);
			 // execute the login function
			ctrl.Model.userName="name";
			ctrl.Model.password="password";
			ctrl.Model.confirmPassword="password";
			ctrl.register();
			// propagate promise resolution to 'then' function using $apply().
			$rootScope.$apply();
			//ensure controller executes success
			expect(ctrl.Loading.Error).toBe(false);
			expect(ctrl.redirect).toHaveBeenCalled();
		});
	});
});