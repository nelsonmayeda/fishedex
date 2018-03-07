'use strict';
//TEST: main app module and routing module
//app module should exist
//app module should have routing dependency
//routing module should exist
//routing module should have (ui.router,home,account,fish,lists,species) dependencies 
describe('UNIT TEST app.module.js', function() {
	var hasDependency = function(m,dependencyName) {
		var deps = m.requires;
		return deps.indexOf(dependencyName) >= 0;
	};
	/////////////////////////
	describe('app module', function () {
//app module should exist
		it('should exist', function() {
			var mod = angular.module('app');
			expect(mod).toBeTruthy();//not null or undefined or empty
		});
//app module should have routing dependency
		it("should have routing dependency", function() {
			var mod = angular.module('app');
			expect(hasDependency(mod,'app.routing')).toEqual(true);
			expect(hasDependency(mod,'app.component')).toEqual(true);
		});
	});
	/////////////////////////
	describe('routing module', function () {
//routing module should exist
		it('should exist', function() {
			var mod = angular.module('app.routing');
			expect(mod).toBeTruthy();//not null or undefined or empty
		});
//routing module should have (ui.router,home,account,fish,lists,species) dependencies 
		it("should have (ui.router,home,account,fish,lists,species) dependencies ", function() {
			var mod = angular.module('app.routing');
			expect(hasDependency(mod,'ui.router')).toEqual(true);
			expect(hasDependency(mod,'account')).toEqual(true);
			expect(hasDependency(mod,'fish')).toEqual(true);
			expect(hasDependency(mod,'home')).toEqual(true);
			expect(hasDependency(mod,'lists')).toEqual(true);
			expect(hasDependency(mod,'species')).toEqual(true);
		});
	});
});