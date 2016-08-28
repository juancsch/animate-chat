/**
 *
 */

'use strict'

const socketio = require('socket.io')

function initWebSocketServer(server, database, video) {

    const db = database()
    const io = socketio(server)

    io.on('connection', (socket) => {

        console.log(`Client conection ${socket.id}`);

        db.list(function(err, messages) {
            if (err) return console.error(err)
            socket.emit('messages', messages)
        })

        socket.on('message', function(message) {

            const converter = video.convert(message.frames)

            converter
                .on('log', console.log)
                .on('video', function(video) {

                    delete message.frames
                    message.video = video

                    db.save(message, function(err) {
                        if (err) return console.error(err)
                    })

                    io.sockets.emit('message', message)
                })
        })
    })
}

module.exports = initWebSocketServer
