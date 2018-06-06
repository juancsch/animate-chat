const port = process.env.PORT

const server = require('./server')
const routes = require('./routes')
const realtime = require('./realtime')

server.start(routes, realtime, port)
