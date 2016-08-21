/**
 *
 */

'use strict'

describe('Chimp Jasmine', function() {

    describe('Page title', function() {

        it('should be set by the Meteor method @watch', function() {

            browser.url('http://localhost:8080')
            expect(browser.getTitle()).to.equal('Chat')
        });

        /* it('should by the Meteor method @watch', function() {

            browser.url('http://localhost:8080')
                .setValue('input[name="message"]', 'my message')
                .getValue('input[name="message"]')
                    //.then(function(value) {
                    //    console.log('***', value)
                    //})
        }); */
    });
});
