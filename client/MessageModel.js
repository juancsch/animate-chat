/**
 *
 */

'use strict'

const EventEmitter = require('events').EventEmitter
const io = require('socket.io-client')

function buildEvents(sessionId, model, socket) {

    // util.inherits(model, EventEmitter)
    EventEmitter.call(model)
    Object.assign(model, EventEmitter.prototype)

    socket.on('message', (message) => {
        model.emit('message', message)
    })

    socket.on('messages', (messages) => {
        model.emit('messages', messages)
    })
}

function emitMessage(sessionId, socket, message) {

    socket.emit('message', {
        id: sessionId,
        message: message.message,
        frames: message.frames
    })
}

function build(sessionId) {

    const socket = io.connect()

    const model = {

        update(message) {

            console.log('sending:', message)

            emitMessage(sessionId, socket, message)
        }
    }

    buildEvents(sessionId, model, socket)

    return model
}

module.exports = build
