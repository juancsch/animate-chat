const video = require('./video')

module.exports = {

	imagesToVideo (images, success, fail = console.error) {
		video.convert(images)
			.on('video', success)
			.on('error', fail)
			.on('log', console.log)
	}
}
