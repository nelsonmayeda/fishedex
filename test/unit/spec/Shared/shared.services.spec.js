'use strict';
//TEST: factories for communicating data
//Each service should set data
//Each service should get data
describe('UNIT TEST shared.services.js', function () {
	describe('Loading Service', function () {
		var LoadingService;
		function services($injector) {
			LoadingService = $injector.get('LoadingService');
		}
		beforeEach(function () {
			module('shared');
			inject(services); 
		});
		it('should start empty', function() {
			expect(LoadingService.State.Active).toEqual(false);
            expect(LoadingService.State.Error).toEqual(false);
            expect(LoadingService.State.Message).toEqual("");
		});
		it('should set Start data', function() {
			LoadingService.Start("Start: TEST");
			expect(LoadingService.State.Active).toEqual(true);
            expect(LoadingService.State.Error).toEqual(false);
            expect(LoadingService.State.Message).toEqual("Start: TEST");
		});
		it('should set Success data', function() {
			LoadingService.Success("Success: TEST");
			expect(LoadingService.State.Active).toEqual(false);
            expect(LoadingService.State.Error).toEqual(false);
            expect(LoadingService.State.Message).toEqual("Success: TEST");
		});
		it('should set Error data for http response', function() {
			var data = {status:500,statusText:"TEST"};
			LoadingService.Error(data);
			expect(LoadingService.State.Active).toEqual(false);
            expect(LoadingService.State.Error).toEqual(true);
            expect(LoadingService.State.Message).toEqual("Error: TEST");
		});
		it('should set Error data for aborted call', function() {
			var data = {status:-1,statusText:""};
			LoadingService.Error(data);
			expect(LoadingService.State.Active).toEqual(false);
			expect(LoadingService.State.Error).toEqual(true);
			expect(LoadingService.State.Message).toEqual("Error: Request aborted");
		});
	});
	describe('api Url Service', function () {
		var apiUrlService;
		function services($injector) {
			apiUrlService = $injector.get('apiUrlService');
		}
		beforeEach(function () {
			module('shared');
			inject(services); 
		});
		it('should return an environment based url', function() {
			expect(apiUrlService.Wiki()).toContain("/api/");
		});
	});
	describe('Modal Service', function () {
		var modalService;
		function services($injector) {
			modalService = $injector.get('modalService');
		}
		beforeEach(function () {
			module('shared');
			inject(services); 
		});
		it('should start empty', function() {
			expect(modalService.state.isOpen).toEqual(false);
            expect(modalService.state.message).toEqual("");
		});
		it('should set open', function() {
			modalService.open("Start: TEST");
			expect(modalService.state.isOpen).toEqual(true);
            expect(modalService.state.message).toEqual("Start: TEST");
		});
		it('should set close', function() {
			modalService.open("Start: TEST");
			modalService.close();
			expect(modalService.state.isOpen).toEqual(false);
            expect(modalService.state.message).toEqual("");
		});
	});
});