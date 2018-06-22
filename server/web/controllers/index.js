const actions = require('../../app/actions')

const imagesProcessRoute = require('./image-processed')(actions)

module.exports = {
	imagesProcessRoute
}
