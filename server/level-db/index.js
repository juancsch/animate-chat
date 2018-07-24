const level = require('level')
const ttl = require('level-ttl')
const uuid = require('uuid')
const concat = require('concat-stream')

const DEFAULT_DURATION = 10 * 60 * 1000

module.exports = function build (options = {limit: 10}) {

	const db = ttl(level('messages.db'), {
		checkFrequency: 10000
	})

	const duration = options.duration || DEFAULT_DURATION

	return {
		save: save(db, duration),
		list: list(db, options)
	}
}

const save = (db, duration) => (message = '', callback = () => {}) => {

	const key = `message-${Date.now()}-${uuid.v4()}`
	const opt = {
		valueEncoding: 'json',
		ttl: duration
	}

	db.put(key, message, opt, callback)
}

const list = (db, options) => (callback = () => {}) => {

	db.createValueStream({
		limit: options.limit,
		valueEncoding: 'json',
		reverse: true,
		gt: 'message'
	}).pipe(concat(function (messages) {
		callback(null, messages.reverse())
	})).on('error', callback)
}
