'use strict';
//TEST: shared module
//shared module should exist
//shared module should have env dependency
describe('UNIT TEST shared.module.js', function() {
    var hasDependency = function(m,dependencyName) {
		var deps = m.requires;
		return deps.indexOf(dependencyName) >= 0;
	};
	///////////////////////
	describe('shared module', function () {
//shared module should exist
		it('should exist', function() {
			var mod = angular.module('shared');
			expect(mod).toBeTruthy();//not null or undefined or empty
		});
//shared module should have env dependency
		it('should have env dependency', function() {
			var mod = angular.module('shared');
			expect(hasDependency(mod,'env')).toEqual(true);
		});
	});
});