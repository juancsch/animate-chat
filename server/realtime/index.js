const webSocketServer = require('./websocket-server')
const video = require('../video')
const database = require('../database')

module.exports = {
    initWith (server) {
        webSocketServer.start(server, database, video)
    }
}
