import { Message } from "./Message";

export type MessageFrames = Message & {
	frames: object[]
}

export function MessageFramesVO (id: string, message: string, frames: object[]): MessageFrames {
	return {
		id,
		message,
		frames
	}
}
