const http = require('http')

// const socketio = require('socket.io')

const app = require('./web')
const realtime = require('./realtime')

const port = process.env.PORT || 8080

const server = http.createServer(app)
// const websocket = socketio(server)
realtime.initWith(server)

// launch run server
server.listen(port, () => {
  console.log('Server started on port:', port)
})
