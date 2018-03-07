'use strict';
//TEST: filters
//verify filter modifies input string correctly
describe('UNIT TEST shared.filters.js', function() {
	describe('removeWhitespace filter', function() {
		var $filter;

		beforeEach(function(){
			module('shared');
			inject(function(_$filter_){
				$filter = _$filter_;
			})
		});
		var filtername = "removeWhitespace";
		it('returns null when given null', function() {
			var f = $filter(filtername);
			expect(f(null)).toBeNull();
		});
		it('returns empty when given empty', function() {
			var f = $filter(filtername);
			expect(f('')).toBe('');
		});
		it('returns the same value when given a string of chars', function() {
			var f = $filter(filtername);
			expect(f('abc')).toEqual('abc');
		});
		it('returns string with spaces replaced by underscore', function() {
			var f = $filter(filtername);
			expect(f('abc efg')).toEqual('abcefg');
		});
	});
});