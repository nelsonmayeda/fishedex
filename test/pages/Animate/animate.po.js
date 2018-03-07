var animatePO = function() {
    this.clone = element(by.css(".anim-animating"));
    this.fromView = element(by.css(".view-leave"));
    this.toView = element(by.css(".view-enter"));
};
module.exports = animatePO;