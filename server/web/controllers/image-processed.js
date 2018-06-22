const HTTP_OK = 200
const HTTP_SERVER_ERROR = 500

function fail (err, res) {
	res.status(HTTP_SERVER_ERROR)
		.set('Content-Type', 'text/plain')
		.send(err.message)
}

module.exports = (video) => (req, res) => {

	if (!Array.isArray(req.body.images)) {
		return fail({message: 'parameter `images` is required'}, res)
	}

	video.convert(req.body.images)
		.on('video', function (vd) {
			res.status(HTTP_OK)
				.set('Content-Type', 'application/json')
				.json({
					video: vd
				})
		})
		.on('error', function (err) {
			fail(err, res)
		})
		.on('log', console.log)
}
