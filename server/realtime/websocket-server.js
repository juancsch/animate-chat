const socket = require('socket.io')

function start (server, database, video) {

    const db = database()
    const io = socket.listen(server)

    io.on('connection', (socket) => {

        console.log(`Client conection ${socket.id}`)

        db.list(function (err, messages) {
            if (err) return console.error(err)
            socket.emit('messages', messages)
        })

        socket.on('message', function (message) {

            console.log('msg recived:', message.id, message.message)

            const converter = video.convert(message.frames)

            converter
                .on('log', console.log)
                .on('video', function (vd) {

                    delete message.frames
                    message.video = vd

                    db.save(message, function (err) {
                        if (err) return console.error(err)
                    })

                    io.sockets.emit('message', message)
                })
        })
    })
}

module.exports = {
    start
}
