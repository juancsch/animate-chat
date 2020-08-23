
export default function (wrtc, messageModel) {
	return {
		record (message) {
			console.log('record video ...')

			// wrtc.recordVideo(function (err, frames) {
			//
			//     if (err) return console.error(err)
			messageModel.update({
				message
			})
			// })
		},
		events: messageModel
	}
}
