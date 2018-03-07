'use strict';
//TEST: account module
//account module should exist
//account module should have (controllers,services,shared) dependencies
describe('UNIT TEST account.module.js', function() {
    var hasDependency = function(m,dependencyName) {
		var deps = m.requires;
		return deps.indexOf(dependencyName) >= 0;
	};
	///////////////////////
	describe('account module', function () {
//account module should exist
		it('should exist', function() {
			var mod = angular.module('account');
			expect(mod).toBeTruthy();//not null or undefined or empty
		});
//account module should have (controllers,services,shared) dependencies
		it('should have (controllers,shared,services) dependencies', function() {
			var mod = angular.module('account');
			expect(hasDependency(mod,'account.controllers')).toEqual(true);
			expect(hasDependency(mod,'account.services')).toEqual(true);
			expect(hasDependency(mod,'shared')).toEqual(true);
		});
	});
});