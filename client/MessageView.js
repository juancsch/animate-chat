const domify = require('domify')
const messageTpl = require('./tmpls/message.hbs')

const ui = {
  messages: document.querySelector('#messages'),
  alert: document.querySelector('#alert'),
  input: document.querySelector('input[name="message"]'),
  msgBox: document.querySelector('form')
}

function addMessage (message) {

  ui.messages.appendChild(domify(messageTpl(message)))
  printSend('none')
}

function printSend (display) {

  ui.alert.style.display = display
  window.scrollTo(0, document.body.scrollHeight)
}

module.exports = function build (messageViewModel) {

    ui.msgBox.addEventListener('submit', function (ev) {

        ev.preventDefault()

        printSend('block')
        const message = ui.input.value
        ui.input.value = ''

        messageViewModel.record(message)

    }, false)

    messageViewModel.events.on('message', addMessage)

    messageViewModel.events.on('messages', (messages) => {
        messages.forEach(addMessage)
    })
}
