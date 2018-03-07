'use strict';
//TEST: main app component
//component controller should exist
//component controller should have initial scope values
//component controller should have scope functions
//component should have template with "<nav></nav>" semantic element
//NOTE:app component has no controller
//NOTE:app component has no bindings
describe('UNIT TEST header.component.js', function () {
	var $compile,$controller,$rootScope,$templateCache;
	function providers($injector) {
		$controller = $injector.get('$controller');
		$compile = $injector.get('$compile');
		$rootScope = $injector.get('$rootScope');
		$templateCache = $injector.get('$templateCache');
	};
	beforeEach(function () {
		module('ui.router');//for transitions
		module('shared');
		module('account.services');
		inject(providers); 
	});

	///////////////////////
	describe('headerController controller', function () {
		var ctrl;
		beforeEach(function () {
			ctrl = $controller('headerController', {},{});
		});
		it('should exist', function() {
			expect(ctrl).toBeTruthy();
		});
		it('should have initial scope values', function() {
			expect(ctrl.authentication.isAuth).toBe(false);
			expect(ctrl.authentication.userName).toBe('');
		});
		it('should have scope functions', function() {
			expect(typeof ctrl.menuToggle).toBe('function');
			expect(typeof ctrl.navToggle).toBe('function');
			expect(typeof ctrl.logout).toBe('function');
		});
	});

//should have template with "<nav></nav>" semantic element
	it('should have template with "<nav></nav>" semantic element', function() {
		var html = $templateCache.get('/App/Shared/Header/navbar.html');
		var element = angular.element(html);
		expect(element.find('nav')).not.toEqual(null);
	});

//component should compile subcomponents
	it('should compile subcomponents', function() {
		var scope = $rootScope.$new();
		var html = $templateCache.get('/App/Shared/Header/navbar.html');
		var element = angular.element(html);
		$compile(element)(scope);
		scope.$apply();
		
		expect(element.find('.search-form')).not.toEqual(null);
		expect(element.find('.file-input-wrapper')).not.toEqual(null);
		expect(element.find('.bread')).not.toEqual(null);
	});
});