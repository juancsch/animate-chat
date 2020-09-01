import http from 'http'

import webApi from './web-api'
import webSocket from './web-socket'

const port = process.env.PORT || 8080

const app = webApi.init()
const httpServer = http.createServer(app)
webSocket.listen(httpServer)

httpServer.listen(port,() => {
	console.log(`Server started on port ${port}`)
})

httpServer.on('error', (error: Error & {syscall: string, code: string}) => {

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

process.on('SIGINT', doCloseAllConnection)  // ctrl + c
process.on('SIGTERM', doCloseAllConnection) // kill pid

function doCloseAllConnection () {
	console.log('SIGT* signal received ...')
	process.exit(0)
}
