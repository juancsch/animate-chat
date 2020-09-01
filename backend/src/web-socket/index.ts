import socketIO, { Socket } from 'socket.io'
import { Server as HttpServer } from 'http'

import { saveMessage, listMessages } from '../modules/message'

export default {
	listen
}

function listen (server: HttpServer) {

	const serverSocket = socketIO.listen(server)

	serverSocket.on('connection', clientSocket => {

		console.log(`Client connected ${clientSocket.id}`)

		emitMessagesTo(clientSocket)

		listenMessageEvent(clientSocket, serverSocket)
		listenDisconnectEvent(clientSocket)
	})
}

function emitMessagesTo (socket: Socket) {
	listMessages()
		.then(
			messages => socket.emit('messages', messages)
		).catch(
			err => socket.emit('error:messages', err)
		)
}

function listenMessageEvent (clientSocket: Socket, socketServer: socketIO.Server) {

	clientSocket.on('message', message => {

		console.log('msg received:', message)

		saveMessage(message)
			.then(
				() => socketServer.sockets.emit('message', message)
			).catch(
				err => socketServer.sockets.emit('error:messages', err)
			)
	})
}

function listenDisconnectEvent (socket: Socket) {
	socket.on('disconnect', () => {
		console.log(`Client disconnected ${socket.id}`)
	})
}
