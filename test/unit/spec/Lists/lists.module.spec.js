'use strict';
//TEST: lists module
//lists module should exist
//lists module should have (controllers,shared,animate) dependencies
describe('UNIT TEST lists.module.js', function() {
    var hasDependency = function(m,dependencyName) {
		var deps = m.requires;
		return deps.indexOf(dependencyName) >= 0;
	};
	///////////////////////
	describe('lists module', function () {
//lists module should exist
		it('should exist', function() {
			var mod = angular.module('lists');
			expect(mod).toBeTruthy();//not null or undefined or empty
		});
//lists module should have (controllers,shared,animate) dependencies
		it('should have (controllers,shared,animate) dependencies', function() {
			var mod = angular.module('lists');
			expect(hasDependency(mod,'lists.controllers')).toEqual(true);
			expect(hasDependency(mod,'shared')).toEqual(true);
			expect(hasDependency(mod,'app.animate')).toEqual(true);
		});
	});
});