import http from 'http'

import webApiServer from './web-api'
import webSocketServer from './web-socket'

const port = process.env.PORT || 8080

const httpServer = http.createServer(webApiServer())

httpServer.listen(port,() => {
	console.log(`Server started on port ${port}`)
})
httpServer.on('error', (error: any) => {

	if (error.syscall !== 'listen') {
		throw error
	}

	switch (error.code) {
		case 'EACCES':
			console.error('Port requires elevated privileges')
			process.exit(1)
			break
		case 'EADDRINUSE':
			console.error('Port is already in use')
			process.exit(1)
			break
		default:
			throw error
	}
})

webSocketServer.listen(httpServer)

process.on('SIGINT', doCloseAllConnection)  // ctrl + c
process.on('SIGTERM', doCloseAllConnection) // kill pid

function doCloseAllConnection () {
	console.log('SIGT* signal received ...')
	process.exit(0)
}
