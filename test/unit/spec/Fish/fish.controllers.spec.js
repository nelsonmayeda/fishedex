'use strict';
//TEST: controllers for fish views
//Each controller should exist
//Each controller should have initial scope values
//Each controller should have scope functions
//Auto call init() 
//Each controller should execute scope functions
// with error should change scope.Loading.Error
// with success either redirect or show message
describe('UNIT TEST - fish.controllers.js', function() {
	var $httpBackend, $controller, $q, $rootScope;
	function providers($injector) {
		$httpBackend = $injector.get('$httpBackend');
		$controller = $injector.get('$controller');
		$q = $injector.get('$q');
		$rootScope= $injector.get('$rootScope');
	}
	var _fishServices;
	function services($injector) {
		_fishServices = $injector.get('FishServices');
	}
	beforeEach(function () {
		module('fish.controllers'); 
		inject(services); 
		inject(providers); 
	});
	describe('fishIndex controller', function () {
//Each controller should exist
		it('should exist', function() {
			var ctrl=$controller('fishIndexController', {},{});//dont put in beforeeach, instantiates controller calling init
			expect(ctrl).toBeTruthy();//not null or undefined or empty
		});
//Each controller should have initial scope values
		it('should have initial scope values', function() {
			var ctrl=$controller('fishIndexController', {},{});//dont put in beforeeach, instantiates controller calling init
			expect(ctrl.Model.FishList).toEqual([]);
			expect(ctrl.Model.CanEdit).toBe(false);
		});
//Each controller should have scope functions
		it('should have initial scope functions', function() {
			var ctrl=$controller('fishIndexController', {},{});//dont put in beforeeach, instantiates controller calling init
			expect(typeof ctrl.LoadMore).toBe('function');
			expect(typeof ctrl.init).toBe('function');
		});
//Auto call init() 
		it('should auto call init', function() {
			var deferred= $q.defer();
			deferred.resolve({});
			spyOn(_fishServices, 'FishIndex').and.returnValue(deferred.promise);//put this before controller instantiation
			var ctrl= $controller('fishIndexController', {},{});//dont put in beforeeach, instantiates controller calling init
			// propagate promise resolution to 'init.then' function using $apply().
			$rootScope.$apply();
			expect(_fishServices.FishIndex).toHaveBeenCalled();
		});
//Each controller should execute scope functions
// with error should change scope.Loading.Error
		it('should call FishIndex service and if failure then show error', function() {
			var deferred= $q.defer();
			deferred.reject();
			spyOn(_fishServices, 'FishIndex').and.returnValue(deferred.promise);
			var ctrl= $controller('fishIndexController', {},{});//dont put in beforeeach, instantiates controller calling init
			// propagate promise resolution to 'init.then' function using $apply().
			$rootScope.$apply();
			//ensure controller executes failure
			expect(ctrl.Loading.Error).toBe(true);
		});
//Each controller should execute scope functions
// with success no error
		it('should call FishIndex service and if successful then show no error', function() {
			var deferred= $q.defer();
			deferred.resolve({});
			spyOn(_fishServices, 'FishIndex').and.returnValue(deferred.promise);
			var ctrl= $controller('fishIndexController', {},{});//dont put in beforeeach, instantiates controller calling init
			// propagate promise resolution to 'init.then' function using $apply().
			$rootScope.$apply();
			//ensure controller executes success
			expect(ctrl.Loading.Error).toBe(false);
		});
	});
});