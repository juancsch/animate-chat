const EventEmitter = require('events')
const dataURI2Buffer = require('data-uri-to-buffer')
const async = require('async')
const uuid = require('uuid')
const os = require('os')
const fs = require('fs')
const path = require('path')
const concat = require('concat-stream')

module.exports = (ffmpegCmd, listFilterFolder) => images => {

    function decodeImage (image, done) {

        count += 1
        const fileName = `${baseName}-${count}.jpg`
        const buffer = dataURI2Buffer(image)
        fs.createWriteStream(path.join(tmpDir, fileName))
            .on('error', done)
            .end(buffer, done)

        events.emit('log', `converting ${fileName}`)
    }

    function decodeImages (done) {

        async.eachSeries(images, decodeImage, done)
    }

    function createVideo (done) {

        events.emit('log', 'Creating video')

        ffmpegCmd({
            baseName,
            folder: tmpDir
        }, done)
    }

    function encodeVideo (done) {

        const fileName = `${baseName}.webm`

        events.emit('log', `Encoding video ${fileName}`)

        fs.createReadStream(path.join(tmpDir, fileName))
            .pipe(concat(function (videoBuffer) {
                video = `data:video/webm;base64,${videoBuffer.toString('base64')}`
                done()
            }))
            .on('error', done)
    }

    function cleanUp (done) {

        events.emit('log', `cleaning up`)

        listFilterFolder(tmpDir, baseName, function (err, files) {
            if (err) return done(err)
            deleteFiles(files, done)
        })
    }

    function deleteFiles (files, done) {

        async.each(files, deleteFile, done)
    }

    function deleteFile (file, done) {

        events.emit('log', `deleting ${file}`)

        fs.unlink(path.join(tmpDir, file), function () {
            // ignore err
            done()
        })
    }

    function convertFinished (err) {

        if (err) return events.emit('error', err)
        events.emit('video', video)
    }

    const events = new EventEmitter()
    let count = 0
    const baseName = uuid.v4()
    const tmpDir = os.tmpdir()
    let video

    async.series([
        decodeImages,
        createVideo,
        encodeVideo,
        cleanUp
    ], convertFinished)

    return events
}
