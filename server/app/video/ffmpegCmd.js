const os = require('os')
const path = require('path')
const spawn = require('child_process').spawn

module.exports = ffmpegCmd

function ffmpegCmd (options, callback) {

    if (!options.baseName) {
        return callback(new TypeError('You must specify a baseName'))
    }

    const folder = options.folder || os.tmpdir()
    const baseName = options.baseName
    const fileSrc = path.join(folder, `${baseName}-%d.jpg`)
    const fileDest = path.join(folder, `${baseName}.webm`)

    // ffmpeg -i images-%d.jpg -filter:v "setpts=2.5*PTS" -vcodec libvpx -an video.webm
    const ffmpeg = spawn('bin/ffmpeg', [
        '-i',
        fileSrc,
        '-filter:v',
        'setpts=2.5*PTS',
        '-vcodec',
        'libvpx',
        '-an',
        fileDest
    ])

    ffmpeg.stdout.on('close', function (code) {
        if (!code) return callback(null)
        callback(new Error(`ffmpeg exited with code ${code}`))
    })
}