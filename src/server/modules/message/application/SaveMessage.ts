import { MessagesRepository } from "../domain/MessagesRepository";
import { Message } from "../domain/Message";

export function SaveMessagesFactory (messageRepository: MessagesRepository) {
	return (message: Message): Promise<void> => {

		// generate video from images frames

		return messageRepository.save({
			id: message.id,
			message: message.message
		})
	}
}
