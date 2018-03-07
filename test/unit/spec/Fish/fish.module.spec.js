'use strict';
//TEST: account module
//fish module should exist
//fish module should have (controllers,shared,animate) dependencies
describe('UNIT TEST fish.module.js', function() {
    var hasDependency = function(m,dependencyName) {
		var deps = m.requires;
		return deps.indexOf(dependencyName) >= 0;
	};
	///////////////////////
	describe('fish module', function () {
//fish module should exist
		it('should exist', function() {
			var mod = angular.module('fish');
			expect(mod).toBeTruthy();//not null or undefined or empty
		});
//fish module should have (controllers,shared,animate) dependencies
		it('should have (controllers,shared,animate) dependencies', function() {
			var mod = angular.module('fish');
			expect(hasDependency(mod,'fish.controllers')).toEqual(true);
			expect(hasDependency(mod,'app.animate')).toEqual(true);
		});
	});
});