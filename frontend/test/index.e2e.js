/* eslint-disable no-undef */
/* eslint-disable no-magic-numbers */

describe('Animate Chat', function () {

    describe('When index page', () => {

        it('should be set initial @watch', () => {

            browser.url('http://localhost:8080')
            expect(browser).toHaveTitle('New Animate Chat')

			const msgBox = $('input[name="message"]')
            expect(msgBox).toBeFocused()
        })

        it('should show sending message when submit form @watch', () => {

            browser.url('http://localhost:8080')

			$('input[name="message"]').setValue('my message')
			$('input[name="send_msg"]').click()

            expect($('#alert')).toBeDisplayed()
        })

        xit('should show the same message sended @watch', () => {

            const msgSended = 'a message'

            browser.url('http://localhost:8080')

            const numMsgs = $$('ul#messages>li').length
            console.log('*** msgs', numMsgs)

			$('input[name="message"]').setValue(msgSended)
			$('input[name="send_msg"]').click()

            const lastEleMsgs = $('ul#messages>li:last-child>p')
            expect(lastEleMsgs).toHaveValue(msgSended)
        })
    })
})
