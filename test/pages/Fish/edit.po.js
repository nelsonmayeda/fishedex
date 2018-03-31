var editPO = function() {
    this.inputTitle = element(by.css('input[name="Title"]'));
    this.inputDescription = element(by.css('input[name="Description"]'));
    this.inputFile = element(by.css('input[name="imageFile"]'));
    this.submit =  element(by.css('input[name="Save"]'));
};
module.exports = editPO;