import Webrtc2Images from 'webrtc2images'

export default function () {

    const rtc = new Webrtc2Images({
        width: 200,
        height: 200,
        frames: 10,
        type: 'image/jpeg',
        quality: 0.4,
        interval: 200
    })

    rtc.startVideo((err) => {
        if (err) console.error(err)
    })

    return rtc
}
