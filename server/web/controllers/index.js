const imagesProcessRoute = require('./image-processed')

module.exports = actions => {
	return {
		imagesProcessRoute: imagesProcessRoute(actions)
	}
}
