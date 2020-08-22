import { MessagesLevelDBRepositoryFactory } from '../../../src/server/modules/message/infraestructure/messages-leveldb-repository'
import { MessageVO } from "../../../src/server/modules/message/domain/Message";

describe('Messages repository', function () {

	const db = MessagesLevelDBRepositoryFactory()

	it('should list all messages saved', async () => {

		await db.clear()

		await db.save(MessageVO('', 'one'))
		await db.save(MessageVO('', 'two'))
		await db.save(MessageVO('', 'three'))

		const messages = await db.list()

		expect(messages.length).toEqual(3)
	})
})
