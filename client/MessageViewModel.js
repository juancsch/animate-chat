function record (message, wrtc, messageModel) {

    console.log('record video ...')

    wrtc.recordVideo(function (err, frames) {

        if (err) return console.error(err)

        messageModel.update({
            message,
            frames
        })
    })
}

export default function (wrtc, messageModel) {
    return {
        record (message) {
            record(message, wrtc, messageModel)
        },
        events: messageModel
    }
}
