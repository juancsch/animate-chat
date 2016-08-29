/**
 *
 */

'use strict'

const fs = require('fs')

function listFilterFolder(folder, filter, callback) {

    function filterFiles(file) {

        return file.startsWith(filter)
    }

    function onReaddir(err, results) {

        if (err) return callback(err)

        callback(err, results.filter(filterFiles))
    }

    fs.readdir(folder, onReaddir)
}

module.exports = listFilterFolder
