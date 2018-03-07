var detailsPO = function() {
    this.Title = element(by.css('.bannerTitle'));
    this.Description = element(by.css('.bannerDescription'));
    this.firstFish = element.all(by.css('.gallery .box.Fish')).first();
};
module.exports = detailsPO;