import { ListMessagesFactory } from './application/ListMessages'
import { SaveMessagesFactory } from './application/SaveMessage'
import { MessagesLevelDBRepositoryFactory } from './infraestructure/messages-leveldb-repository'

const messagesRepository = MessagesLevelDBRepositoryFactory()
const listMessages = ListMessagesFactory(messagesRepository)
const saveMessage = SaveMessagesFactory(messagesRepository)

export {
	listMessages,
	saveMessage
}
