'use strict';
//TEST: animate module
//animate module should exist
//animate module should have ngAnimate dependency
//animation components should add .view-enter to .view-transition on enter
//animation components should add .view-leave to .view-transition on leave
//animation components should add .anim-leave,.anim-enter,.anim-animating to corresponding elements
describe('UNIT TEST animate.module.js', function() {
    var hasDependency = function(m,dependencyName) {
		var deps = m.requires;
		return deps.indexOf(dependencyName) >= 0;
	};
	///////////////////////
	describe('animate module', function () {
//animate module should exist
		it('should exist', function() {
			var mod = angular.module('app.animate');
			expect(mod).toBeTruthy();//not null or undefined or empty
		});
//animate module should have ngAnimate dependency
		it('should have shared dependency', function() {
			var mod = angular.module('app.animate');
			expect(hasDependency(mod,'ngAnimate')).toEqual(true);
		});
	});
	describe('animate components', function () {
		var $compile,$rootScope,$animate,$document;
		function providers($injector) {
			$compile = $injector.get('$compile');
			$rootScope = $injector.get('$rootScope');
			$animate = $injector.get('$animate');
			$document = $injector.get('$document');
		}
		beforeEach(function() {
			module('app.animate');
			inject(providers); 
		});
//animation components should add .view-enter to .view-transition on enter
		it('should  add .view-enter to .view-transition on enter', function() {
			var parent = angular.element($document[0].body);
			var scope = $rootScope.$new();
			var html = '<div class="view-transition"></div>';
			var element = angular.element(html);
			$compile(element)(scope);
			scope.$apply();
			
			$animate.enter(element, parent);
			expect(element.find('.view-enter')).toBeTruthy();
		});
//animation components should add .view-leave to .view-transition on leave
		it('should  add .view-leave to .view-transition on leave', function() {
			var parent = angular.element($document[0].body);
			var scope = $rootScope.$new();
			var html = '<div class="view-transition"></div>';
			var element = angular.element(html);
			$compile(element)(scope);
			scope.$apply();
			$animate.leave(element);
			expect(element.find('.view-leave')).toBeTruthy();
		});
//animation components should add .anim-leave,.anim-enter,.anim-animating to corresponding elements
		it('should add .anim-leave,.anim-enter,.anim-animating to corresponding elements', function() {
			var parent = angular.element($document[0].body);
			var scope = $rootScope.$new();
			var html = '<div class="view-transition"><div class="animTEST"></div></div>';
			var newelement = angular.element(html);
			$compile(newelement)(scope);
			var oldelement = angular.element(html);
			$compile(oldelement)(scope);
			scope.$apply();
			
			$animate.enter(oldelement, parent);
			$animate.enter(newelement, parent);
			$animate.leave(oldelement);
			expect(newelement.find('.view-enter animTEST.anim-enter')).toBeTruthy();
			expect(oldelement.find('.view-leave animTEST.anim-leave')).toBeTruthy();
			expect(parent.find('.anim-animating')).toBeTruthy();
		});
	});
});