const webSocketServer = require('./server')

module.exports = ({database, actions}) => ({
    listen (server) {
        webSocketServer(server, database, actions)
    }
})
