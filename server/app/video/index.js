const listFilterFolder = require('./listFilterFolder')
const ffmpegCmd = require('./ffmpegCmd')
const convert = require('./convert')({ffmpegCmd, listFilterFolder})

module.exports = {
    convert
}
