import EventEmitter from 'events'
import io from 'socket.io-client'

function emitMessage (sessionId, socket, message) {

    socket.emit('message', {
        id: sessionId,
        message: message.message,
        frames: message.frames
    })
}

function subscribeTo (socket, model) {

    socket.on('message', (message) => {
        model.emit('message', message)
    })

    socket.on('messages', (messages) => {
        model.emit('messages', messages)
    })
}

// class MessageModel extends EventEmitter {
//
//     constructor (sessionId, socket) {
//         super()
//         this._sessionId = sessionId
//         this._socket = socket
//         subscribeTo(this._socket, this)
//     }
//
//     update (message) {
//         console.log('sending:', message)
//         emitMessage(this._sessionId, this._socket, message)
//     }
// }

function buildModel (sessionId, socket) {

    const model = {
        update (message) {
            console.log('sending:', message)
            emitMessage(sessionId, socket, message)
        }
    }

    Object.assign(model, EventEmitter.prototype)
    EventEmitter.call(model)

    subscribeTo(socket, model)

    return model
}

export default function (sessionId) {
    const socket = io.connect()
    return buildModel(sessionId, socket)
}
