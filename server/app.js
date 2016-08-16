/**
 *
 */

'use strict'

const port = process.env.PORT || 8080

const server = require('./server')
const routes = require('./routes')
const realtime = require('./realtime');

server.start(routes, realtime, port)
