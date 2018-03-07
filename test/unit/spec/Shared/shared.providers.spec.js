'use strict';
//TEST: provider for httpinterceptor
//set data
//verify get data
describe('UNIT TEST shared.providers.js', function () {
	describe('verificationProvider', function () {
		var verificationProvider;
		function services($injector) {
			verificationProvider = $injector.get('verificationProvider');
		}
		beforeEach(function () {
			module('shared');
			inject(services); 
		});
		it('should start empty', function() {
			expect(verificationProvider.csrf.key).toEqual("__RequestVerificationToken");
			expect(verificationProvider.csrf.token).toEqual("");
		});
		it('should set token', function() {
			verificationProvider.setToken("test");
			expect(verificationProvider.csrf.key).toEqual("__RequestVerificationToken");
			expect(verificationProvider.csrf.token).toEqual("test");
		});
		it('should not be able to change key', function() {
			try{verificationProvider.csrf.key="bad";}catch(err){}
			expect(verificationProvider.csrf.key).toEqual("__RequestVerificationToken");
		});
	});
});