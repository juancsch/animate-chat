#!/usr/bin/env node

const http = require('http')

const webApi = require('../server/web-api').default()
const webSocket = require('../server/web-socket')

const port = process.env.PORT || 8080

const httpServer = http.createServer(webApi)

httpServer.listen(port,() => {
	console.log(`Server started on port ${port}`)
})
httpServer.on('error', (error) => {

	if (error.syscall !== 'listen') {
		throw error
	}

	switch (error.code) {
		case 'EACCES':
			console.error('Port requires elevated privileges')
			process.exit(1)
		case 'EADDRINUSE':
			console.error('Port is already in use')
			process.exit(1)
		default:
			throw error
	}
})

webSocket.listen(httpServer)

process.on('SIGINT', doCloseAllConnection)  // ctrl + c
process.on('SIGTERM', doCloseAllConnection) // kill pid

function doCloseAllConnection () {
	console.log('SIGT* signal received ...')
	process.exit(0)
}
