'use strict';
var loginHelper = requireHelper('loginHelper.js');
var registerPO = requirePO('/Account/register.po.js');
var changePasswordPO = requirePO('/Account/changePassword.po.js');
var indexPO = requirePO('/Account/manageIndex.po.js');
var EC = protractor.ExpectedConditions;

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4();
}
describe('E2E TEST - Account', function() {
	var username = 'TestAccount'+guid();  
	var password = guid();
	var newpassword = guid();
	describe('Register', function() {
		it('should create an account', function() {
			browser.get('/Account/Register');
			
			var registerPage = new registerPO();
			registerPage.usernameField.sendKeys(username);
			registerPage.passwordField.sendKeys(password);
			registerPage.confirmPasswordField.sendKeys(password);
			//chromedriver bug, intermittently causes "Element is not clickable at point", many open issues on github
			browser.sleep(1000);
			registerPage.submit.click();
			//verify that the login was succesful by checking if the logout button is displayed
			browser.wait(EC.visibilityOf(element(by.id("navLogout"))), 1000);
			
			//should auto redirect to "/" and be logged in
			browser.wait(EC.not(EC.titleContains("Register")), 1000);
			expect(element(by.id("navLogout")).isDisplayed()).toBeTruthy();
			loginHelper.logout();
		});
	});
	describe('Login', function() {
		it('should login to that account', function() {
			loginHelper.login(username,password);
			
			//verify that the login was succesful by checking if the logout button is displayed
			expect(element(by.id("navLogout")).isDisplayed()).toBeTruthy();
			loginHelper.logout();
		});
	});
	describe('Logout', function() {
		it('should logout of that account', function() {
			loginHelper.login(username,password);
			
			loginHelper.logout();
			//verify that the logout was succesful by checking if the login button is displayed
			expect(element(by.id("navLogin")).isDisplayed()).toBeTruthy();
		});
	});
	describe('Manage with auth', function() {
		it('should load without error', function() {
			loginHelper.login(username,password);
			
			browser.setLocation('/Account');
			//browser.get is now clearing cookies along with refresh, even while not in incognito mode
			//browser.get('/Account');
			//loginHelper.waitForLogin();
			//check page message
			var indexPage = new indexPO();
			browser.wait(EC.invisibilityOf(indexPage.Loading), 1000);
			expect(indexPage.Error.isDisplayed()).toBeFalsy();
			loginHelper.logout();
		});
		
	});
	describe('Change Password', function() {
		it('should change password', function() {
			loginHelper.login(username,password);
			
			browser.setLocation('/Account/ChangePassword');
			//browser.get is now clearing cookies along with refresh, even while not in incognito mode
			//browser.get('/Account/ChangePassword');
			//loginHelper.waitForLogin();
			//check page message
			
			var changePasswordPage = new changePasswordPO();
			changePasswordPage.inputOldPassword.sendKeys(password);
			changePasswordPage.inputNewPassword.sendKeys(newpassword);
			changePasswordPage.inputConfirmPassword.sendKeys(newpassword);
			//chromedriver bug, intermittently causes "Element is not clickable at point", many open issues on github
			browser.sleep(1000);
			changePasswordPage.submit.click();
			
			//verify that the login was succesful by checking if the logout button is displayed
			browser.wait(EC.visibilityOf(element(by.css(".form-success"))), 1000);
			
			loginHelper.logout();
			loginHelper.login(username,newpassword);
			
			//should auto redirect to fishedex / and be logged in
			expect(element(by.id("navLogout")).isDisplayed()).toBeTruthy();
			
			loginHelper.logout();
		});
	});
	
});