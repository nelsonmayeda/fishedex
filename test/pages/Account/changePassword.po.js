var changePasswordPO = function() {
this.inputOldPassword = element(by.css('input[name="OldPassword"]'));
this.inputNewPassword = element(by.css('input[name="NewPassword"]'));
this.inputConfirmPassword = element(by.css('input[name="ConfirmPassword"]'));
this.submit =  element(by.css('input[name="ChangePassword"]'));
};
module.exports = changePasswordPO;