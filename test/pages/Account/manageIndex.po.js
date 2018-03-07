var indexPO = function() {
this.Error = element(by.css('.loadingError .bannerMessage'));
this.Loading = element(by.css('.loadingActive .bannerMessage'));
this.UserName = element(by.css('.banner .username'));
this.Email = element(by.css('.banner .email'));
};
module.exports = indexPO;