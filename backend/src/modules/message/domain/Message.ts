
export type Message = {
	id: string
	message: string
}

export function MessageVO (id: string, message: string): Message {
	return {
		id,
		message
	}
}
