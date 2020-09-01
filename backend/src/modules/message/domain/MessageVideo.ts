import { Message } from './Message'

export type MessageVideo = Message & {
	video: object
}

export function MessageVideoVO (id: string, message: string, video: object): MessageVideo {
	return {
		id,
		message,
		video
	}
}
