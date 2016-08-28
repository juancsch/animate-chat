/**
 *
 */

'use strict'

const domify = require('domify')
const messageTpl = require('./tmpls/message.hbs')

module.exports = function(messageViewModel) {

    const messages = document.querySelector('#messages')
    const alert = document.querySelector('#alert')
    const input = document.querySelector('input[name="message"]')

    function addMessage(message) {

        messages.appendChild(domify(messageTpl(message)))
        printSend('none')
    }

    function printSend(display) {

        alert.style.display = display
        window.scrollTo(0, document.body.scrollHeight)
    }

    document.querySelector('form').addEventListener('submit', function(e) {

        e.preventDefault()

        printSend('block')
        const message = input.value
        input.value = ""

        messageViewModel.record(message)

    }, false)

    messageViewModel.events.on('message', addMessage)

    messageViewModel.events.on('messages', (messages) => {
        messages.forEach(addMessage)
    })
}
