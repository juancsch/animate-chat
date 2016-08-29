/**
 *
 */

'use strict'

const level = require('level')
const ttl = require('level-ttl')
const uuid = require('uuid')
const concat = require('concat-stream')

function buildDatabase(options) {

    const db = ttl(level('./messages.db'), {
        checkFrequency: 10000
    })

    const duration = options.duration || 10 * 60 * 1000

    function save(message, callback) {

        const key = `message-${Date.now()}-${uuid.v4()}`
        const opt = {
            valueEncoding: 'json',
            ttl: duration
        }

        db.put(key, message, opt, callback)
    }

    function list(callback) {

        db.createValueStream({
            limit: options.limit,
            valueEncoding: 'json',
            reverse: true,
            gt: 'message'
        }).pipe(concat(function (messages) {
            callback(null, messages.reverse())
        })).on('error', callback)
    }

    return {
        save,
        list
    }
}

module.exports = function(options = {limit: 10}) {

    return buildDatabase(options)
}
