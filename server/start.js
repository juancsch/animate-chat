const http = require('http')

const appWeb = require('./web')
const database = require('./db-level')()
const webSocketServer = require('./web-socket')(database)

const port = process.env.PORT || 8080

const httpServer = http.createServer(appWeb)
webSocketServer.listen(httpServer)

httpServer.listen(port, () => {
  console.log('Server started on port:', port)
})
