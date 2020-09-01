// @ts-ignore
import level from 'level'
import { LevelUp } from 'levelup'
import ttl from 'level-ttl'
import uuid from 'uuid'
import concat from 'concat-stream'

import { Message } from '../domain/Message'
import { MessagesRepository } from '../domain/MessagesRepository'

export function MessagesLevelDBRepositoryFactory ({
	  	databaseName = 'messages.db',
	  	duration = 10 * 60 * 1000,
		limit = 10 } = {}): MessagesRepository {

	const db = ttl(level(databaseName), {
		checkFrequency: 10000
	})

	return {
		save: save(db, duration),
		list: list(db, limit),
		clear: clear(db)
	}
}

const save = (db: LevelUp, duration: number) => (message: Message): Promise<void> => {
	const key = `message-${Date.now()}-${uuid.v4()}`
	const options = {
		valueEncoding: 'json',
		ttl: duration
	}
	return new Promise((resolve, reject) =>
		db.put(key, message, options, err => {
			if (err) return reject(err)
			resolve()
		})
	)
}

const list = (db: LevelUp, limit: number) => (): Promise<any> => {
	const options = {
		limit,
		valueEncoding: 'json',
		reverse: true,
		gt: 'message'
	}
	return new Promise((resolve, reject) => {
		db.createValueStream(options)
		.pipe(concat(resolve))
		.on('error', reject)
	})
}

const clear = (db: LevelUp) => (): Promise<void> => db.clear({ gt: 'message' })
