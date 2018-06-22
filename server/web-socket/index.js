const actions = require('../app/actions')

const webSocketServer = require('./server')

module.exports = db => ({
    listen (server) {
        webSocketServer(server, db, actions)
    }
})
