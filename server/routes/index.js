const imagesProcessRoute = require('./images_process')

module.exports = {

    registerOn (app) {

        app.use('/images/process', imagesProcessRoute)
    }
}
