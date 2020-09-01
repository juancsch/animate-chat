import uuid from 'uuid'
// import Webrtc2Images from '../dominio/Webrtc2Images'

export function SendMessageFactory (connection) {

	const sessionId = uuid.v4()
	// const wrtc = Webrtc2Images()
	const frames = undefined

	return message => {
		// wrtc.recordVideo(function (err, frames) {
		//	if (err) return console.error(err)
			connection.emit('message', {
				id: sessionId,
				message,
				frames
		})
		// })
	}
}
