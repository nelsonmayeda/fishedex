(function () {
    'use strict';
    //ng-animate-ref causes choppy transitions. sets initial absolute position, sets new absolute position, lets css transition:top/left handle movement calculations.
    //3D transform results in smoother transitions. set initial absolute position, javascript calculates position difference to target, sets new position with translate3d, still uses css transitions but faster processing transform:translate3d 
    var mod = angular.module('app.animate', ['ngAnimate']);
    mod.animation('.view-transition', [function () {
        var _toView = null,
            _fromView = null,
            _doneList = [],//nganimate done callbacks for view-enter,view-leave
            _startTimer = null,//sync issues on variables _toView,_fromView
            _movingList = [];//myapp.animate done callbacks for cloned elements
        //Order that these events happen
        //1. New view enters
        function enter(view, done) {
            if (_toView) {
                finish();//cancel existing transitions before starting new one
            }
            _toView = view;
            _doneList.push(done);
            view.addClass('view-enter');
            return cancel;
        };
        //2. Then old view leaves
        function leave(view, done) {
            _fromView = view;
            _doneList.push(done);
            view.addClass('view-leave');
            tryStart();
            return cancel;
        };

        //3. Allow time for those two view variables to sync
        function tryStart() {
            if (!_startTimer && (!_fromView || !_toView)) {
                _startTimer = setTimeout(function () {
                    tryStart();
                },500);
            } else {
                if (_startTimer) clearTimeout(_startTimer);
                start();
            }
        };
        //4. Actually start or cancel everything
        function start() {
            if (_fromView && _toView) {
                var fromElements = _fromView[0].getElementsByClassName('anim');
                var toElements = _toView[0].getElementsByClassName('anim');

                // Find all the matching pairs
                var pairs = [];
                for (var n = 0; n < fromElements.length; n++) {
                    for (var m = 0; m < toElements.length; m++) {
                        if (fromElements[n].getAttribute('anim-ref') === toElements[m].getAttribute('anim-ref')) {
                            pairs.push({
                                from: fromElements[n],
                                to: toElements[m]
                            });
                        }
                    }
                }

                // Trigger the animation for each pair
                pairs.forEach(function (pair) {
                    animateElement(angular.element(pair.from), angular.element(pair.to));
                });
            } else {
                finish();//ie cancel current
            }
        };

        // Helper: Get the current view position and size of an element
        function getViewRect(element, view) {
            var elementRect = element[0].getBoundingClientRect();
            var viewRect = view[0].getBoundingClientRect();
            return {
                top: elementRect.top - viewRect.top,
                left: elementRect.left - viewRect.left,
                width: elementRect.width,
                height: elementRect.height
            };
        };

        // Animate a cloned element from position in old view to position in new view
        function animateElement(fromElement, toElement) {
            // Get the old view position
            var fromRect = getViewRect(fromElement, _fromView);

            // Clone old element and hide the target elements
            var moving = fromElement.clone();
            fromElement.addClass('anim-leave');
            toElement.addClass('anim-enter');

            // initial position
            moving.css({
                top: fromRect.top + 'px',
                left: fromRect.left + 'px',
                width: fromRect.width + 'px',
                height: fromRect.height + 'px',
                margin: '0'
            }).addClass('anim-animating');
            //attach cloned element
            _fromView.parent().append(moving);
            _fromView.addClass('view-animating');

            // Setup the event handler for the end of the transition
            var handler = {
                complete: false,// Allows us to track which animations have finished
                onComplete: function () {
                    handler.complete = true;
                    tryFinish();//don't know which element will complete first, check after each one
                },
                remove: function () {
                    // Show the original target element
                    toElement.removeClass('anim-enter');

                    // Unbind the event handler to stop leaks
                    moving.unbind('transitionend', handler.onComplete);//'transitionend' event is fired after a css transition has completed
                    // and remove the element
                    moving.remove();
                }
            };
            _movingList.push(handler);

            // Delay here allows the DOM to update w/clone before starting
            setTimeout(function () {
                var toRect = getViewRect(toElement, _toView);
                // Move to the new position (animated by css transition)
                var transform = 'translate3d(' + (toRect.left - fromRect.left) + 'px, '
                    + (toRect.top - fromRect.top) + 'px, 0)';
                moving.css({
                    '-webkit-transform': transform,
                    transform: transform,
                    width: toRect.width + 'px',
                    height: toRect.height + 'px'
                });
                // Switch the clone element to the target's classes,
                // which allows us to animate other properties beyond size,position
                // like color, border, etc.
                moving.attr('class', toElement.attr('class') + ' anim-animating anim-animating-active');

                // Handle the event at the end of transition
                moving.bind('transitionend', handler.onComplete);
            }, 100);
        };

        // Each moving element will try to call finish
        // Check that all the moving elements are complete before actually calling finish()
        function tryFinish() {
            var allComplete = true;
            _movingList.forEach(function (m) {
                allComplete = allComplete && m.complete;
            });

            if (allComplete) {
                finish();
            }
        };

        // Clear everything down and initialise for next time
        function finish() {
            // Call remove for each cloned element
            if (_movingList) _movingList.forEach(function (m) {
                m.remove();
            });
            _movingList = [];
            // Call "done" on any remaining views (which may call "clear" so clone the array)
            var doneCallbacks = _doneList.slice(0);
            doneCallbacks.forEach(function (done) {
                done();
            });
            _doneList = [];
            //clean up other references
            _fromView = null;
            _toView = null;
            _startTimer = null;
        };
        //ngAnimate is supposed to automatically cancel old animation if new one is triggered
        //but even with fast clicking, it doesn't ever get called with isCancelled==true
        //not sure of a scenario where this gets called with isCancelled==true
        function cancel(isCancelled) {
            if (isCancelled) {
                finish();
            }
        };

        // Definition used by AngularJS animation
        return {
            leave: function (element, done) {
                return leave(element, done);//returns cancel/end callback
            },
            enter: function (element, done) {
                return enter(element, done);//returns cancel/end callback
            }
        };
    }]);
})();
