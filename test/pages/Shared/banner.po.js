var bannerPO = function() {
    this.title = element(by.css(".bannerTitle"));
    this.description = element(by.css(".bannerDescription"));
    this.loadingActive = element(by.css(".loadingActive"));
    this.loadingError = element(by.css(".loadingError"));
};
module.exports = bannerPO;