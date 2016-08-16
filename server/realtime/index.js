/**
 *
 */

'use strict'

const realtime = require('./realtime')
const video = require('../video')
const database = require('../database')

module.exports = {

    initWith(server) {

        realtime(server, database, video)
    }
}
