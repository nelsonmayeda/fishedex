var changeEmailPO = function() {
this.inputOldEmail = element(by.css('input[name="OldEmail"]'));//readonly
this.inputNewEmail = element(by.css('input[name="NewEmail"]'));
this.inputPassword = element(by.css('input[name="Password"]'));
this.submit =  element(by.css('input[name="ChangeEmail"]'));
};
module.exports = changeEmailPO;