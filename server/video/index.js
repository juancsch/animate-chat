/**
 * es un wrapper que nos permite exportar codigo de un modulo ...
 */

'use strict'

const listFilterFolder = require('./listFilterFolder')
const ffmpegCmd = require('./ffmpegCmd')
const convertFn = require('./convert').new(ffmpegCmd, listFilterFolder)

module.exports = {

    convert: convertFn
}
