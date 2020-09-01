import { MessagesRepository } from '../domain/MessagesRepository'
import { Message } from '../domain/Message'

export function ListMessagesFactory (messageRepository: MessagesRepository) {
	return (): Promise<Message[]> => messageRepository.list()
}
