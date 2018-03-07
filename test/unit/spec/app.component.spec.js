'use strict';
//TEST: main app component
//component should exist
//component should have template with "<main></main>" semantic element
//component should have element with ui-view="" attribute
//component should have element with ui-view="pageHeader" attribute
//NOTE:app component has no controller
//NOTE:app component has no bindings
describe('UNIT TEST app.component.js', function () {
	describe('app component', function () {
		var $compile,$rootScope;
		function providers($injector) {
			$compile = $injector.get('$compile');
			$rootScope = $injector.get('$rootScope');
		}
		beforeEach(function() {
			module('app.test');//for templatecache
			module('app.component');
			inject(providers); 
		});
		var scope,html,element;
		beforeEach(function() {
			scope = $rootScope.$new();
			html = '<app></app>';
			element = angular.element(html);
			$compile(element)(scope);
			scope.$apply();//note that $rootScope.$digest() loads the default state in app.routing
		});
//component should exist
		it('should exist', function() {
			var comp;
			inject(['appDirective',function(appDirective){comp= appDirective;}]);//note "Directive" suffix after actuall component name, also not "Component" suffix
			expect(comp).toBeTruthy();//not null or undefined or empty
		});
//component should have "<main></main>" semantic element
		it('should have template with "<main></main>" semantic element', function() {
			expect(element.find('main')).not.toEqual(null);
		});
//component should have element with ui-view="" attribute
		it('should have element with ui-view empty attribute', function() {
			expect(element.find('[ui-view=""]')).not.toEqual(null);
		});
//component should have element with ui-view="pageHeader" attribute
		it('should have element with ui-view pageHeader attribute', function() {
			expect(element.find('[ui-view="pageHeader"]')).not.toEqual(null);
		});
//component should have element with ui-view="pageFooter" attribute
		it('should have element with ui-view pageFooter attribute', function() {
			expect(element.find('[ui-view="pageFooter"]')).not.toEqual(null);
		});
	});
});