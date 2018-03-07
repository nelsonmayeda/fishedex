//create,read,update,delete a species
var path = require('path');
var loginHelper = requireHelper('loginHelper.js');
var EC = protractor.ExpectedConditions;
var createPO = requirePO('/Species/create.po.js');
var detailsPO = requirePO('/Species/details.po.js');
var indexPO = requirePO('/Species/index.po.js');
var editPO = requirePO('/Species/edit.po.js');
var deletePO = requirePO('/Species/delete.po.js');
function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4();
}
describe('E2E TEST - Species:', function() {
	beforeEach(function(){
		loginHelper.login('testAccount','testPassword0');
	});
	afterEach(function(){
		loginHelper.logout();
	});
	var Id, Title, Description;
	describe('Species Create', function() {
		it('should create a species', function(done) {
			browser.get('/Lists/197/SpeciesCreate');
			
			//since entire browser refreshes, have to wait for login to sync again
			loginHelper.waitForLogin();
			
			var createPage = new createPO();
			
			Title = "Title "+guid(); //save this for later
			Description = "Description "+guid(); //save this for later
			var file = path.resolve(__dirname,'testimg.png');
			
			createPage.inputTitle.sendKeys(Title);
			createPage.inputDescription.sendKeys(Description);
			createPage.inputFile.sendKeys(file);
			createPage.submit.click();
			
			//should auto redirect to details /Species/{Id}
			browser.wait(EC.not(EC.titleContains("Create")), 5000);
			var detailsPage = new detailsPO();
			detailsPage.Title.getText().then(function(titleText){
				expect(titleText.toUpperCase()).toBe(Title.toUpperCase());
			}).then(function(){
				detailsPage.Description.getText().then(function(descriptionText){
					expect(descriptionText.toUpperCase()).toBe(Description.toUpperCase());
				});
			}).then(function(){
				browser.getCurrentUrl().then(function(url){
					Id=url.split('/').pop(); 
					console.log("Id:"+Id);
					done();
				});
			});
		});
		
	});
	describe('Species Index', function() {
		it('should list newest species first', function(done) {
			browser.get('/Lists/197/');
			var indexPage = new indexPO();
			
			indexPage.firstTitle.getText().then(function(titleText){
				expect(titleText.toUpperCase()).toBe(Title.toUpperCase());
				done();
			});
		});
		
	});
	describe('Species Edit', function() {
		it('should change title and description', function(done) {
			browser.get('/Species/'+Id+'/Edit');
			
			//since entire browser refreshes, have to wait for login to sync again
			loginHelper.waitForLogin();
			
			var editPage = new editPO();
			
			var newTitle ="Title "+guid();
			var newDescription = "Description "+guid();
			var newFile = path.resolve(__dirname,'testimg.png');
			
			editPage.inputTitle.clear().then(function(){
				editPage.inputTitle.sendKeys(newTitle);
			}).then(function(){
				editPage.inputDescription.clear().then(function(){
					editPage.inputDescription.sendKeys(newDescription);
				});
			}).then(function(){
				editPage.inputFile.sendKeys(newFile);
				editPage.submit.click();
			});
			//should auto redirect to details /Species/{Id}
			browser.wait(EC.not(EC.titleContains("Edit")), 5000);
			var detailsPage = new detailsPO();
			
			detailsPage.Title.getText().then(function(titleText){
				expect(titleText.toUpperCase()).toBe(newTitle.toUpperCase());
			}).then(function(){
				detailsPage.Description.getText().then(function(descriptionText){
					expect(descriptionText.toUpperCase()).toBe(newDescription.toUpperCase());
					done();
				});
			});
		});
		
	});
	describe('Species Delete', function() {
		it('should delete this species', function(done) {
			browser.get('/Species/'+Id+'/Delete');
			
			//since entire browser refreshes, have to wait for login to sync again
			loginHelper.waitForLogin();
			
			var deletePage = new deletePO();
			deletePage.submit.click();
			
			//should auto redirect to index /Species
			browser.wait(EC.not(EC.titleContains("Delete")), 5000);
			var indexPage = new indexPO();
			indexPage.firstTitle.getText().then(function(titleText){
				expect(titleText.toUpperCase()).not.toBe(Title.toUpperCase());
				done();
			});
		});
		
	});
});