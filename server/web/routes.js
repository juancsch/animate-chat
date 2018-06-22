
module.exports = controllers => {
    return {
		registerOn (app) {
			app.use('/images/process', controllers.imagesProcessRoute)
		}
	}
}
