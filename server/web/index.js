module.exports = ({actions}) => {
	const controllers = require('./controllers')(actions)
	const routes = require('./routes')(controllers)
	return require('./app')(routes)
}
