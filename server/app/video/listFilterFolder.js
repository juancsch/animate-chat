const fs = require('fs')

module.exports = function (folder = '', filter = '', callback = () => {}) {

	fs.readdir(folder, onReadDir(filter, callback))
}

const onReadDir = (filter, callback) => (err, results) => {
	if (err) return callback(err)
	callback(err, results.filter(startsWith(filter)))
}

const startsWith = filter => file => {
	return file.startsWith(filter)
}
