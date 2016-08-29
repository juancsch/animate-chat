/**
 *
 */

'use strict'

function record(message, wrtc, messageModel) {

    wrtc.recordVideo(function(err, frames) {

        if (err) return console.error(err)

        messageModel.update({
            message,
            frames
        })
    })
}

module.exports = function(wrtc, messageModel) {

    return {

        record(message) {

            record(message, wrtc, messageModel)
        },
        events: messageModel
    }
}
