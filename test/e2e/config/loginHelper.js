var EC = protractor.ExpectedConditions;
var navbarPO = requirePO('/Shared/navbar.po.js');
var loginHelper = function (){  
	var navbarPage = new navbarPO(); 
    this.waitForLogin = function(){
		//verify that the login was succesful by checking if the logout button is displayed
		browser.wait(EC.visibilityOf(navbarPage.navLogout), 1000);
	};
    this.login = function(username,password){
		var driver = browser.driver;
        browser.get('http://localhost:59686/Account/Login');

        var usernameField = element(by.css('input[name="Username"]'));
        var passwordField = element(by.css('input[name="Password"]'));
        var submit = element(by.css('input[name="Login"]'));
		
        usernameField.sendKeys(username);
		passwordField.sendKeys(password);
        submit.click();
		
		this.waitForLogin();
	};
	this.waitForLogout = function(){
		//verify that the logout was succesful by checking if the login button is displayed
		browser.wait(EC.visibilityOf(navbarPage.navLogin), 1000);
    };
	this.logout = function(){
		var driver = browser.driver;
		navbarPage.navLogout.click();
		
		this.waitForLogout();
    };
};

module.exports = new loginHelper();  