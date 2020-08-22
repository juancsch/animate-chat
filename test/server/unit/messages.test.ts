import { ListMessagesFactory } from "../../../src/server/modules/message/application/ListMessages";
import { SaveMessagesFactory } from "../../../src/server/modules/message/application/SaveMessage";
import { MessagesRepository } from "../../../src/server/modules/message/domain/MessagesRepository";

describe('Messages management', function () {

	const repository: MessagesRepository = {
		list: jest.fn(),
		save: jest.fn(),
		clear: jest.fn()
	}

	it('should list all message into database', async () => {

		const listMessages = ListMessagesFactory(repository)
		await listMessages()

		expect(repository.list).toBeCalledTimes(1)
	})

	it('should compose video from images collection', async () => {

		const saveMessage = SaveMessagesFactory(repository)

		const message = {
			id: '',
			message: ''
		}

		await saveMessage(message)

		expect(repository.save).toBeCalledTimes(1)
		expect(repository.save).toBeCalledWith({
			id: message.id,
			message: message.message
		})
	})
})
