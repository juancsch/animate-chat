const webSocketServer = require('./server')

module.exports = (db, actions) => ({
    listen (server) {
        webSocketServer(server, db, actions)
    }
})
