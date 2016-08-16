/**
 *
 */

'use strict'

const events = require('events');
const io = require('socket.io-client')

function buildEvents(sessionId, socket) {

    var eventEmitter = new events.EventEmitter();

    socket.on('message', (message) => {
        eventEmitter.emit('message', message)
    })

    socket.on('messageack', (message) => {
        if (message.id === sessionId) {
            eventEmitter.emit('message', message)
        }
    })

    socket.on('messages', (messages) => {
        eventEmitter.emit('messages', messages)
    })

    return eventEmitter
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

    return {

        update(message) {

            emitMessage(sessionId, socket, message)
        },
        events: buildEvents(sessionId, socket)
    }
}

module.exports = build
