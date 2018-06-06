
describe('Animate chat expectations', () => {

    describe('When index page', () => {

    describe('When index page', function() {

        it('should be set initial @watch', function() {

            browser.url('http://localhost:8080')

            expect(browser.getTitle()).to.equal('Animate Chat')
            expect(browser.hasFocus('input[name="message"]')).to.equal(true)
        })

        xit('should show sending message when submit form @watch', () => {

            browser.url('http://localhost:8080')
                .setValue('input[name="message"]', 'my message')
                .submitForm('form[name="sender_msg"]')

            expect(browser.getCssProperty('#alert', 'display').value)
                .to.equal('block')
        })

        xit('should show the same message sended @watch', () => {

            const msgSended = 'a message'

            browser.url('http://localhost:8080')

            const numMsgs = browser.elements('ul#messages>li').value.length
            // console.log('*** msgs', browser.elements('ul#messages'), browser.elements('ul#messages>li'))

            browser
                .setValue('input[name="message"]', msgSended)
                .submitForm('form[name="sender_msg"]')
                .waitUntil(() => {
                    return numMsgs < browser.elements('ul#messages>li').value.length
                }, 10000)

            const printerMsg = browser.getValue('ul#messages>li:last-child>p')

            expect(printerMsg).to.equal(msgSended)
        })
    })
})
