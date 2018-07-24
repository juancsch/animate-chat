module.exports = ({actions}) => {
	const controllers = require('./controllers')(actions)
	return require('./server')(controllers)
}
