/**
 *
 */

'use strict'

const Webrtc2Images = require('webrtc2images')

function buildRtc() {

    const rtc = new Webrtc2Images({
        width: 200,
        height: 200,
        frames: 10,
        type: 'image/jpeg',
        quality: 0.4,
        interval: 200
    })

    rtc.startVideo(function(err) {
        if (err) return logError(err)
    })

    function logError(err) {
        console.error(err)
    }

    return rtc
}

module.exports = buildRtc
