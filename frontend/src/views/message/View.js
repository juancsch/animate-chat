import domify from 'domify'

import messageTpl from './tmpls/message.hbs'

const ui = {
	messages: document.querySelector('#messages'),
	alert: document.querySelector('#alert'),
	input: document.querySelector('input[name="message"]'),
	msgBox: document.querySelector('form')
}

export function MessageView ({ send, bus }) {

	ui.msgBox.addEventListener('submit', function (ev) {

		ev.preventDefault()

		printSend('block')
		const message = ui.input.value
		ui.input.value = ''

		send(message)

	}, false)

	bus.on('message', addMessage)

	bus.on('messages', (messages) => {
		messages.forEach(addMessage)
	})
}

function addMessage (message) {
	ui.messages.appendChild(domify(messageTpl(message)))
	printSend('none')
}

function printSend (display) {
	ui.alert.style.display = display
	window.scrollTo(0, document.body.scrollHeight)
}
