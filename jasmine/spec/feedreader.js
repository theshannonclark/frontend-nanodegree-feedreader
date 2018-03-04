/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {

        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Ensure each feed has a URL defined
         * and that the URL is not empty.
         */
        it('have a URL property', function() {
            allFeeds.forEach((feed) => {
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBe('');
            });
        });


        /* Ensure each feed has a name defined
         * and that the name is not empty.
         */
        it('have a name property', function() {
            allFeeds.forEach((feed) => {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBe('');
            });
        });
    });


    describe('The menu', function() {

        /* Ensure the menu element is hidden by default. */
        it('is hidden by default', function() {
            // Maybe there's a better way to do this...
            let $shown = $('<div></div>').css('transform', 'translate3d(0, 0, 0)');

            expect($('body').hasClass('menu-hidden')).toBe(true);
            expect($('.slide-menu').css('transform')).not.toBe($shown.css('transform'));
        });


        /* Ensure the menu changes visibility when the menu icon is clicked. */
        it('changes visibility when the menu icon is clicked', function() {
            let $body = $('body');
            let $menuLink = $('.menu-icon-link');

            let initialMenuHidden = $body.hasClass('menu-hidden');

            $menuLink.click();
            expect($body.hasClass('menu-hidden')).not.toBe(initialMenuHidden);
            $menuLink.click();
            expect($body.hasClass('menu-hidden')).toBe(initialMenuHidden);
        });
    });

    describe('Initial Entries', function() {

        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        /* Ensure when the loadFeed function is called and completes its work,
         * there is at least a single .entry element within the .feed container.
         */
         it('load asynchronously', function(done) {
            expect($('.feed .entry').length).toBeGreaterThan(0);
            done();
         });
    });

    describe('New Feed Selection', function() {

        let initialContent;

        beforeEach(function(done) {
            loadFeed(0, function() {
                initialContent = $('.feed').html();

                loadFeed(1, function() {
                    done();
                });
            });
        });

        afterAll(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        it('actually changes content', function(done) {
            expect($('.feed').html()).not.toBe(initialContent);
            done();
        });
    });
}());
