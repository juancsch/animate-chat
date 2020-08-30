import { SendMessageFactory } from './application/send'
import { MessageEventBusFactory } from './application/events'
import { ConnectionFactory } from './infraestructure/Connection'

export function MessageApp () {

	const socket = ConnectionFactory()

	return {
		send: SendMessageFactory(socket),
		bus: MessageEventBusFactory(socket)
	}
}
