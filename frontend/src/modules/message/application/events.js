import { EventEmitter } from 'events'

export function MessageEventBusFactory (connection) {

	const bus = new EventEmitter()

	connection.on('message', message => {
		bus.emit('message', message)
	})

	connection.on('messages', messages => {
		bus.emit('messages', messages)
	})

	connection.on('messages:error', messages => {
		bus.emit('messages:error', messages)
	})

	return bus
}
