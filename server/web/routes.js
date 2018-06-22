const router = require('express').Router()

module.exports = (controllers) => {
    return {
		registerOn (app) {
			app.use('/images/process', router.post('/', controllers.imagesProcessRoute))
		}
	}
}
