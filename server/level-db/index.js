const level = require('level')
const ttl = require('level-ttl')
const uuid = require('uuid')
const concat = require('concat-stream')

exports.MessagesLevelDBRepositoryFactory = function ({ databaseName = 'messages.db', duration = 10 * 60 * 1000, limit = 10 } = {}) {

	const db = ttl(level(databaseName), {
		checkFrequency: 10000
	})

	return {
		save: save(db, duration),
		list: list(db, limit),
		clear: clear(db)
	}
}

const save = (db, duration) => message => {
	const key = `message-${Date.now()}-${uuid.v4()}`
	const opt = {
		valueEncoding: 'json',
		ttl: duration
	}

	return db.put(key, message, opt)
}

const list = (db, limit) => () => {
	return new Promise((resolve, reject) => {
		db.createValueStream({
			limit,
			valueEncoding: 'json',
			reverse: true,
			gt: 'message'
		})
			.pipe(concat(resolve))
			.on('error', reject)
	})
}

const clear = db => () => db.clear({ gt: 'message' })
