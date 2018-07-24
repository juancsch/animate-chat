const imagesProcessController = require('./image-processed')

module.exports = (actions) => ({
	registerOn (server) {
		imagesProcessController({server, actions})
	}
})
