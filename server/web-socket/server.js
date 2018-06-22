const socketio = require('socket.io')

function emitMessagesEvent (socket, db) {

	db.list((err, messages) => {
		if (err) return console.error(err)
		socket.emit('messages', messages)
	})
}

function listenMessageEvent (socket, db, actions, socketServer) {

	socket.on('message', (message) => {

		console.log('msg received:', message.id, message.message)

		actions.imagesToVideo(
			message.frames,
			(video) => {
				const msg = {
					id: message.id,
					message: message.message,
					video
				}
				db.save(msg, (err) => {
					if (err) return console.error(err)
				})
				socketServer.sockets.emit('message', msg)
			}
		)
	})
}

function listenDisconnectEvent (socket) {

	socket.on('disconnect', () => {
		console.log(`Client disconnected ${socket.id}`)
	})
}

module.exports = function build (server, db, actions) {

	const serverSocket = socketio.listen(server)

	serverSocket.on('connection', clientSocket => {

		console.log(`Client connected ${clientSocket.id}`)

		emitMessagesEvent(clientSocket, db)
		listenMessageEvent(clientSocket, db, actions, serverSocket)
		listenDisconnectEvent(clientSocket)
	})
}
