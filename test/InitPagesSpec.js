/**
 *
 */

'use strict'

describe('Animate chat expectations', function() {

    describe('Index page', function() {

        it('should be set initial @watch', function() {

            browser.url('http://localhost:8080')
            expect(browser.getTitle()).to.equal('Animate Chat')
            expect(browser.hasFocus('input[name="message"]')).to.equal(true)
        })

        it('should show sending message when submit form @watch', function() {

            browser.url('http://localhost:8080')
                .setValue('input[name="message"]', 'my message')
                .submitForm('form[name="sender_msg"]')

            expect(browser.getCssProperty('#alert', 'display').value)
                .to.equal('block')
        })

        xit('should show the same message sended @watch', function() {

            const msgSended = 'a message'

            const printerMsg = browser.url('http://localhost:8080')
                .setValue('input[name="message"]', msgSended)
                .submitForm('form[name="sender_msg"]')

                .getValue('ul#messages>li:last-child>p')

            expect(printerMsg).to.equal(msgSended)
        })
    })
})
