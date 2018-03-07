var aboutPO = requirePO('/Home/about.po.js');
var contactPO = requirePO('/Home/contact.po.js');
var privacyPO = requirePO('/Home/privacy.po.js');

describe('E2E TEST - Home:', function() {
	describe('About', function() {
		it('should have title and description', function() {
			browser.get('/About');
			var page = new aboutPO();
			
			expect(page.Title.getText()).toBeNonEmptyString();
			expect(page.Description.getText()).toBeNonEmptyString();
		});
	});
	describe('Contact', function() {
		it('should have title and link', function() {
			browser.get('/Contact');
			var page = new contactPO();
			
			expect(page.Title.getText()).toBeNonEmptyString();
			expect(page.Link.getAttribute('href')).toEqual('mailto:admin@fishedex.com');
		});
		
	});
	describe('Privacy', function() {
		it('should have title and description', function() {
			browser.get('/Privacy');
			var page = new privacyPO();
			
			expect(page.Title.getText()).toBeNonEmptyString();
			//note:descriptions.forEach will not work
			var descriptions = page.Descriptions;
			for(var i =0;i<descriptions.length;i++){
				console.log('ZZZ');
				console.log(descriptions.get(i).getText());
				expect(descriptions.get(i).getText()).toBeNonEmptyString();
			}
		});
	});
});