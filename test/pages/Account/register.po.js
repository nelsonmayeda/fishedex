var registerPO = function() {
this.usernameField = element(by.css('input[name="Username"]'));
this.passwordField = element(by.css('input[name="Password"]'));
this.confirmPasswordField = element(by.css('input[name="ConfirmPassword"]'));
this.submit = element(by.css('input[name="Register"]'));
};
module.exports = registerPO;