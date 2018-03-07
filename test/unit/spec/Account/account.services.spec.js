'use strict';
//TEST: services for account controllers
//providers
//should exist
//should set data
//should get data
//services
//should exist
//should have dependency
//verify http requests are sent
describe('UNIT TEST - account.services.js', function() {
	var $httpBackend;
	var _authProvider,_verificationProvider;
	function providers($injector) {
		$httpBackend = $injector.get('$httpBackend');
		_authProvider = $injector.get('authProvider');
		_verificationProvider = $injector.get('verificationProvider');
	}
    var hasDependency = function(m,dependencyName) {
		var deps = m.requires;
		return deps.indexOf(dependencyName) >= 0;
	};
	beforeEach(function () {
		module('account.services');
		module('shared');
		inject(providers); 
		spyOn(_authProvider, 'resetAuth').and.callThrough();
		spyOn(_verificationProvider, 'setToken').and.callThrough();
	});
	describe('authProvider', function () {
		it('should exist', function() {
			expect(_authProvider).toBeTruthy();//not null or undefined or empty
		});
		it('should start empty', function() {
			expect(_authProvider.authentication.isAuth).toEqual(false);
		});
		it('should set auth', function() {
			_authProvider.setAuth(true,"test");
			expect(_authProvider.authentication.isAuth).toEqual(true);
			expect(_authProvider.authentication.userName).toEqual("test");
		});
		it('should clear auth', function() {
			_authProvider.setAuth(true,"test");
			_authProvider.resetAuth();
			expect(_authProvider.authentication.isAuth).toEqual(false);
			expect(_authProvider.authentication.userName).toEqual("");
		});
	});
	///////////////////////
	describe('accountServices', function() {
		var _accountServices;
		function services($injector) {
			_accountServices = $injector.get('accountServices');
		}
		beforeEach(function () {
			inject(services);
		});
	///////////////////////
		it('should exist', function() {
			expect(_accountServices).toBeTruthy();
		});
		it('should have shared dependency', function() {
			var mod = angular.module('account.services');
			expect(hasDependency(mod,'shared')).toEqual(true);
		});
	///////////////////////
		describe('login', function() {
			var url = '/api/Account/Login';
			it('should POST to '+url, function() {
				// creates a new request expectation
				$httpBackend.expectPOST(url);
				//execute method
				_accountServices.login("name","password",false);
			});
			it('should set auth', function() {
				// creates a new request expectation
				$httpBackend.expectPOST(url).respond({isAuth:true, userName:'name'});
				_accountServices.login("name","password",false).then(function(){
					expect(_authProvider.authentication.isAuth).toEqual(true);
					expect(_authProvider.authentication.userName).toEqual("name");
				});
			});
			it('should reset AntiforgeryToken', function() {
				_verificationProvider.csrf.token ="oldToken";
				// creates a new request expectation
				$httpBackend.expectPOST(url).respond({token:'newToken',isAuth:true, userName:'name'});
				_accountServices.login("name","password",false).then(function(){
					expect(_verificationProvider.setToken).toHaveBeenCalled();
					expect(_verificationProvider.csrf.token).toEqual("newToken");
				});
			});
		});
	///////////////////////
		describe('logout', function() {
			var url = '/api/Account/LogOut';
			it('should POST to '+url, function() {
				// creates a new request expectation
				$httpBackend.expectPOST(url);
				//execute method
				_accountServices.logout();
			});
			it('should reset auth', function() {
				// creates a new request expectation
				$httpBackend.expectPOST(url).respond({isAuth:false, userName:''});
				_accountServices.logout().then(function(){
					expect(_authProvider.resetAuth).toHaveBeenCalled();
				});
			});
			it('should reset AntiforgeryToken', function() {
				_verificationProvider.csrf.token ="oldToken";
				// creates a new request expectation
				$httpBackend.expectPOST(url).respond({token:'newToken',isAuth:true, userName:'name'});
				_accountServices.logout().then(function(){
					expect(_verificationProvider.setToken).toHaveBeenCalled();
					expect(_verificationProvider.csrf.token).toEqual("newToken");
				});
			});
		});
	///////////////////////
		describe('Register', function() {
			var url = '/api/Account/Register';
			it('should POST to '+url, function() {
				// creates a new request expectation
				$httpBackend.expectPOST(url);
				//execute method
				_accountServices.register("name","email","password","password");
			});
			it('should set auth', function() {
				// creates a new request expectation
				$httpBackend.expectPOST(url).respond({isAuth:true, userName:'name'});
				_accountServices.register("name","email","password","password").then(function(){
					expect(_authProvider.authentication.isAuth).toEqual(true);
					expect(_authProvider.authentication.userName).toEqual("name");
				});
			});
			it('should reset AntiforgeryToken', function() {
				_verificationProvider.csrf.token ="oldToken";
				// creates a new request expectation
				$httpBackend.expectPOST(url).respond({token:'newToken',isAuth:true, userName:'name'});
				_accountServices.register("name","email","password","password").then(function(){
					expect(_verificationProvider.setToken).toHaveBeenCalled();
					expect(_verificationProvider.csrf.token).toEqual("newToken");
				});
			});
		});
	});
});