var fishedexPO = function() {
    this.firstBox = element.all(by.css('.gallery .box.Species')).first();
    this.firstTitle = element.all(by.css('.gallery .box .boxTitle')).first();
    this.firstFish = element.all(by.css('.gallery .box.caught')).first();
};
module.exports = fishedexPO;