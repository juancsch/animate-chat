/**
 *
 */

const images_process_route = require('./images_process');

module.exports = {

    registerOn(app) {

        app.use("/images/process", images_process_route)
    }
}
