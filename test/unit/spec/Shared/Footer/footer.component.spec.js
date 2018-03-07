'use strict';
//TEST: footer component
//component controller should exist
//component should have template with "<footer></footer>" semantic element
//NOTE:app component has no controller variables or functions
//NOTE:app component has no bindings
describe('UNIT TEST footer.component.js', function () {
	var $compile,$controller,$rootScope,$templateCache;
	function providers($injector) {
		$controller = $injector.get('$controller');
		$compile = $injector.get('$compile');
		$rootScope = $injector.get('$rootScope');
		$templateCache = $injector.get('$templateCache');
	}
	beforeEach(function () {
		module('shared');
		inject(providers); 
	});

//component controller should exist
	it('component controller should exist', function() {
		var ctrl = $controller('footerController', {},{});
		expect(ctrl).toBeTruthy();
	});

//component controller should exist
	it('should have template with "<footer></footer>" semantic element', function() {
		var html = $templateCache.get('/App/Shared/Footer/footer.html');
		var element = angular.element(html);
		
		expect(element.find('footer')).not.toEqual(null);
	});
});