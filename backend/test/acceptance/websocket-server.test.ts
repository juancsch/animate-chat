import io from 'socket.io-client'

import { Message } from '../../src/modules/message/domain/Message'

describe('Socket server', function () {

	let clientSocket: SocketIOClient.Socket

	beforeEach(() => {
		clientSocket = io.connect('http://localhost:8080')
	})

	afterEach(() => {
		clientSocket	.disconnect()
	})

	it('should received message', (done) => {

		const message = { id: 'xxx', message: 'eo!!' }

		clientSocket.on('message', (msg: Message) => {
			// console.log('*** message', msg)
			expect(msg).toStrictEqual(message)
			// verify if its save ... ???
			done()
		})

		clientSocket.emit('message', message)
	})

	it('should received messages', (done) => {

		clientSocket.on('messages', (msgs: Message[]) => {
			// console.log('*** messages', msgs)
			expect(Array.isArray(msgs)).toBeTruthy()
			done()
		})
	})

	it.skip('should received error messages', (done) => {

		clientSocket.on('error:messages', (err: Error) => {
			console.log('*** error messages', err)
			// expect(err).toThrowError('')
			done()
		})
	})
})
