FishEDex
======

Fishedex is a photo-based todo list.

Live project can be viewed at [https://fishedex.com](https://fishedex.com)

![video](https://raw.githubusercontent.com/nelsonmayeda/fishedex/master/test/e2e/output/videos/website-1.gif)


Packages
======
Frontend written with AngularJS. Custom animations built on ngAnimate. Routing with UIRouter.

Unit tests with Karma, Grunt, and Jasmine. 

E2E tests with Protractor, Grunt, and Jasmine.

Various grunt-contrib libraries for bundling and other optimizations.


Features
======
 * Register and login as a new user.
 * Create a list or follow an existing list.
 * Upload photos and tag them to check off list items.
 * Track your progress on the leaderboard.
 * Catch them all.
 
Instructions
======
grunt test-unit runs all unit tests. Output can be found at /test/unit/output/index.html

grunt test-e2e requires /api backend which is unavailable to external IPs. Output can be found at /test/e2e/output/html/chrome-test-report.html

grunt video creates a HQgif of the website. Output found at /test/e2e/output/videos/guid.gif

grunt start-dev builds and hosts website. Again /api backend is unavailable to external IPs.