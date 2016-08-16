/**
 *
 */

// TODO: usar Promise en vez de async ...

'use strict'

const EventEmitter = require('events').EventEmitter
const dataURI2Buffer = require('data-uri-to-buffer')
const async = require('async')
const uuid = require('uuid')
const os = require('os')
const fs = require('fs')
const path = require('path')
const concat = require('concat-stream')

function build(ffmpegCmd, listFilterFolder) {

    return function(images) {

        const events = new EventEmitter();
        let count = 0
        let baseName = uuid.v4()
        let tmpDir = os.tmpDir()
        let video

        async.series([
            decodeImages,
            createVideo,
            encodeVideo,
            cleanUp
        ], convertFinished);

        function decodeImage(image, done) {

            let fileName = `${baseName}-${count++}.jpg`
            let buffer = dataURI2Buffer(image)
            fs.createWriteStream(path.join(tmpDir, fileName))
                .on('error', done)
                .end(buffer, done)

            events.emit('log', `converting ${fileName}`)
        }

        function decodeImages(done) {

            async.eachSeries(images, decodeImage, done)
        }

        function createVideo(done) {

            events.emit('log', 'Creating video')

            ffmpegCmd({
                baseName: baseName,
                folder: tmpDir
            }, done)
        }

        function encodeVideo(done) {

            let fileName = `${baseName}.webm`

            events.emit('log', `Encoding video ${fileName}`)

            fs.createReadStream(path.join(tmpDir, fileName))
                .pipe(concat(function(videoBuffer) {
                    video = `data:video/webm;base64,${videoBuffer.toString('base64')}`
                    done()
                }))
                .on('error', done)
        }

        function cleanUp(done) {

            events.emit('log', `cleaning up`)

            listFilterFolder(tmpDir, baseName, function(err, files) {
                if (err) return done(err)
                deleteFiles(files, done)
            })
        }

        function deleteFiles(files, done) {

            async.each(files, deleteFile, done)
        }

        function deleteFile(file, done) {

            events.emit('log', `deleting ${file}`)

            fs.unlink(path.join(tmpDir, file), function(err) {
                // ignore err
                done()
            })
        }

        function convertFinished (err) {

          if (err) return events.emit('error', err)
          events.emit('video', video)
        }

        return events
    }
}

module.exports = {

    new(ffmpegCmd, listFilterFolder) {

        return build(ffmpegCmd, listFilterFolder)
    }
}
