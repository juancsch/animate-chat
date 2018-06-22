const router = require('express').Router()

const STATUS_CODE = require('../http-status-code')

const handleFail = (res) => (err) => {
	res.status(STATUS_CODE.HTTP_SERVER_ERROR)
		.set('Content-Type', 'text/plain')
		.send(err.message)
}

const responseVideo = (res) => (vd) => {
	res.status(STATUS_CODE.HTTP_OK)
		.set('Content-Type', 'application/json')
		.json({ video: vd })
}

module.exports = (actions) => router.post('/', (req, res) => {

	if (!Array.isArray(req.body.images)) {
		return handleFail(res)({message: 'parameter `images` is required'})
	}

	actions.imagesToVideo(
		req.body.images,
		responseVideo(res),
		handleFail(res)
	)
})
