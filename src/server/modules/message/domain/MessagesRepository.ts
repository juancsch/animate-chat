import { Message } from "./Message";

export interface MessagesRepository {
	list () : Promise<Message[]>,
	save (message: Message) : Promise<void>,
	clear () : Promise<void>
}
