//take video of transition animations
var videoHelper = requireHelper('videoHelper.js');
var bannerPO = requirePO('/Shared/banner.po.js');
var animatePO = requirePO('/Animate/animate.po.js');
var fishedexPO = requirePO('/Lists/fishedex.po.js');
var speciesPO = requirePO('/Species/details.po.js');
var EC = protractor.ExpectedConditions;
function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4();
}
var cache = [];
function noCircle(key, value) {
    if (typeof value === 'object' && value !== null) {
        if (cache.indexOf(value) !== -1) {
            // Circular reference found, discard key
            return;
        }
        // Store value in our collection
        cache.push(value);
    }
    return value;
};
describe('take a video', function() {
	var g = guid();
	beforeEach(function (done) {
		var mock = function(mockTitle){
			angular.module('shared').factory('titleService', function(){
				return {
					setTitle: function (title) {
						if(window.document.title != mockTitle)window.document.title = mockTitle;
					}
				};
			});
		};
		browser.addMockModule('shared', mock, g);
		var pathGuid = 'test/e2e/output/videos/'+g;
		var windowGuid = 'title='+g +' - Google Chrome';
		browser.get('/');
		browser.wait(EC.titleContains(g), 2000);
		
		//note there is a slight delay from when browser changes title to when ffmpeg can find that window
		setTimeout(function(){ 
			videoHelper.start(windowGuid, pathGuid,done);
		}, 2000);
	});
	it('spec', function(done) {
		var banner = new bannerPO(); 
		var animate = new animatePO(); 
		var fishedex = new fishedexPO(); 
		var species = new speciesPO(); 
		
		browser.wait(EC.not(EC.visibilityOf(banner.loadingActive)), 1000);
		setTimeout(function(){ 
			fishedex.firstFish.click();
			setTimeout(function(){ 
				species.firstFish.click();
				setTimeout(function(){ 
					done();
				}, 3000);
			}, 3000);
		}, 2000);
		/** 
		//should be on home page
		//wait for loading to finish
		console.log("wait loading /list");
		browser.wait(EC.not(EC.visibilityOf(banner.loadingActive)), 1000);
		//navigate to species in gallery
		console.log("click /species");
		fishedex.firstFish.click();
		console.log("clicked /species");
		//wait for loading to finish
		console.log("wait loading /species");
		browser.wait(EC.not(EC.visibilityOf(banner.loadingActive)), 1000);
		//wait for animation to finish
		console.log("wait animate /list->/species");
		browser.wait(EC.not(EC.visibilityOf(animate.clone)), 1000);
		//navigate to fish in gallery
		browser.wait(EC.visibilityOf(species.firstFish), 1000);
		console.log("click /fish");
		species.firstFish.click();
		console.log("clicked /fish");
		browser.wait(EC.visibilityOf(banner.loadingActive), 1000);
		//wait for loading to finish
		console.log("wait loading /fish");
		browser.wait(EC.not(EC.visibilityOf(banner.loadingActive)), 1000);
		//wait for animation to finish
		console.log("wait animate /species->/fish");
		browser.wait(EC.not(EC.visibilityOf(animate.clone)), 1000);
		done();
		*/
	});
	afterEach(function (done) {
		setTimeout(function(){ 
			videoHelper.stop(done);
		}, 2000);
	});
});