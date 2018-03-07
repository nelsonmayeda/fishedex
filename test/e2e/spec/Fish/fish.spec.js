//create,read,update,delete a fish
var path = require('path');
var loginHelper = requireHelper('loginHelper.js');
var EC = protractor.ExpectedConditions;
var createPO = requirePO('/Fish/create.po.js');
var detailsPO = requirePO('/Fish/details.po.js');
var indexPO = requirePO('/Fish/index.po.js');
var editPO = requirePO('/Fish/edit.po.js');
var deletePO = requirePO('/Fish/delete.po.js');
function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4();
}
describe('E2E TEST - Fish:', function() {
	beforeEach(function(){
		loginHelper.login('testAccount','testPassword0');
	});
	afterEach(function(){
		loginHelper.logout();
	});
	var Id, Title, Description;
	describe('Create', function() {
		it('should create a fish', function(done) {
			browser.get('/Fish/Create');
			
			//since entire browser refreshes, have to wait for login to sync again
			loginHelper.waitForLogin();
			
			Title = "Title "+guid(); //save this for later
			Description = "Description "+guid(); //save this for later
			var file = path.resolve(__dirname,'testimg.png');
			
			var createPage = new createPO();
			createPage.inputTitle.sendKeys(Title);
			createPage.inputDescription.sendKeys(Description);
			createPage.inputFile.sendKeys(file);
			createPage.submit.click();
			
			//should auto redirect to details /Fish/{Id}
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
	describe('Index', function() {
		it('should list newest fish first', function(done) {
			browser.get('/Fish/');
			
			var indexPage = new indexPO();
			
			indexPage.firstTitle.getText().then(function(titleText){
				expect(titleText.toUpperCase()).toBe(Title.toUpperCase());
				done();
			});
		});
		
	});
	describe('Edit', function() {
		it('should change title and description', function(done) {
			browser.get('/Fish/'+Id+'/Edit');
			
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
			//should auto redirect to details /Fish/{Id}
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
	describe('Delete', function() {
		it('should delete this fish', function(done) {
			browser.get('/Fish/'+Id+'/Delete');
			
			//since entire browser refreshes, have to wait for login to sync again
			loginHelper.waitForLogin();
			
			var deletePage = new deletePO();
			deletePage.submit.click();
			
			//should auto redirect to index /Fish
			browser.wait(EC.not(EC.titleContains("Delete")), 5000);
			var indexPage = new indexPO();
			indexPage.firstTitle.getText().then(function(titleText){
				expect(titleText.toUpperCase()).not.toBe(Title.toUpperCase());
				done();
			});
		});
		
	});
});