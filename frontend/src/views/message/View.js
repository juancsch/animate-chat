import domify from 'domify'

import messageTpl from './tmpls/message.hbs'

const ui = {
	messages: document.querySelector('#messages'),
	alert: document.querySelector('#alert'),
	input: document.querySelector('input[name="message"]'),
	msgBox: document.querySelector('form')
}

export function MessageView ({ send, bus }) {

	ui.msgBox.addEventListener('submit', submitListener, false)
	bus.on('message', addMessage)
	bus.on('messages', addMessages)

	function submitListener (ev) {

		ev.preventDefault()

		ui.alert.style.display = 'block'

		window.scrollTo(0, document.body.scrollHeight)

		send(ui.input.value)
		ui.input.value = ''
	}

	function addMessages (messages) {
		messages.forEach(addMessage)
	}

	function addMessage (message) {
		ui.messages.appendChild(domify(messageTpl(message)))
		ui.alert.style.display = 'none'
		window.scrollTo(0, document.body.scrollHeight)
	}
}
