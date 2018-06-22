const fs = require('fs')

const startsWith = filter => file => {
	return file.startsWith(filter)
}

const onReadDir = (filter, callback) => (err, results) => {
	if (err) return callback(err)
	callback(err, results.filter(startsWith(filter)))
}

module.exports = (folder, filter, callback) => {

	fs.readdir(folder, onReadDir(filter, callback))
}
