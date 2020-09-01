import io from 'socket.io-client'

export function ConnectionFactory () {
	return io.connect()
}
