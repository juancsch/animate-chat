const controllers = require('./controllers')
const routes = require('./routes')(controllers)
const app = require('./app')(routes)

module.exports = app
