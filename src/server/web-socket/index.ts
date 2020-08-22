import socketIO, { Socket } from "socket.io";
import { Server as HttpServer } from "http";

import { saveMessage, listMessages } from '../modules/message'

export {
	listen
}

function listen (server: HttpServer) {

	const serverSocket = socketIO.listen(server)

	serverSocket.on('connection', clientSocket => {

		console.log(`Client connected ${clientSocket.id}`)

		emitMessagesEvent(clientSocket)
		listenMessageEvent(clientSocket, serverSocket)
		listenDisconnectEvent(clientSocket)
	})
}

function emitMessagesEvent (socket: Socket) {
	listMessages().then(
		messages => socket.emit('messages', messages)
	)
}

function listenMessageEvent (clientSocket: Socket, socketServer: socketIO.Server) {

	clientSocket.on('message', message => {

		console.log('msg received:', message)

		saveMessage(message).then(() =>
			socketServer.sockets.emit('message', message)
		)
	})
}

function listenDisconnectEvent (socket: Socket) {
	socket.on('disconnect', () => {
		console.log(`Client disconnected ${socket.id}`)
	})
}
