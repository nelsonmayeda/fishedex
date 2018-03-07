'use strict';
//TEST: species module
//species module should exist
//species module should have (controllers,shared,animate) dependencies
describe('UNIT TEST species.module.js', function() {
    var hasDependency = function(m,dependencyName) {
		var deps = m.requires;
		return deps.indexOf(dependencyName) >= 0;
	};
	///////////////////////
	describe('species module', function () {
//species module should exist
		it('should exist', function() {
			var mod = angular.module('species');
			expect(mod).toBeTruthy();//not null or undefined or empty
		});
//species module should have (controllers,shared,animate) dependencies
		it('should have (controllers,shared,animate) dependencies', function() {
			var mod = angular.module('species');
			expect(hasDependency(mod,'species.controllers')).toEqual(true);
			expect(hasDependency(mod,'shared')).toEqual(true);
			expect(hasDependency(mod,'app.animate')).toEqual(true);
		});
	});
});