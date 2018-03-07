'use strict';
//TEST: account module
//home module should exist
//home module should have controllers dependency
describe('UNIT TEST home.module.js', function() {
    var hasDependency = function(m,dependencyName) {
		var deps = m.requires;
		return deps.indexOf(dependencyName) >= 0;
	};
	///////////////////////
	describe('home module', function () {
//home module should exist
		it('should exist', function() {
			var mod = angular.module('home');
			expect(mod).toBeTruthy();//not null or undefined or empty
		});
//home module should have controllers dependency
		it('should have controllers dependency', function() {
			var mod = angular.module('home');
			expect(hasDependency(mod,'home.controllers')).toEqual(true);
		});
	});
});