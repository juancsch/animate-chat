const fs = require('fs')

function listFilterFolder (folder, filter, callback) {

    function byFiles (file) {

        return file.startsWith(filter)
    }

    function onReadDir (err, results) {

        if (err) return callback(err)

        callback(err, results.filter(byFiles))
    }

    fs.readdir(folder, onReadDir)
}

module.exports = listFilterFolder
