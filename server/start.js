const http = require('http')

const actions = require('./app/actions')
const appWeb = require('./web')(actions)
const database = require('./level-db')()
const webSocketServer = require('./web-socket')(database, actions)

const port = process.env.PORT || 8080

const httpServer = http.createServer(appWeb)
webSocketServer.listen(httpServer)

httpServer.listen(port, () => {
  console.log('Server started on port:', port)
})
