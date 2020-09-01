import axios from 'axios'

describe('Web API', function () {

	it('should response with index.html', async () => {

		const response = await axios.get('http://localhost:8080')

		expect(response.status).toEqual(200)
		expect(response.headers['content-type']).toEqual('text/html; charset=UTF-8')
		expect(response.data).toContain('<title>New Animate Chat</title>')
	})

	it('should not found request uri', async () => {

		try {
			await axios.get('http://localhost:8080/no-exists')
		} catch (err) {
			expect(err.response.status).toEqual(404)
			expect(err.response.headers['content-type']).toEqual('text/plain; charset=utf-8')
			expect(err.response.data).toEqual('Not Found route when request GET /no-exists')
		}
	})

	it('should verify payload in post images', async () => {

		try {
			await axios.post('http://localhost:8080/images/process')
		} catch (err) {
			expect(err.response.status).toEqual(400)
			expect(err.response.headers['content-type']).toEqual('text/plain; charset=utf-8')
			expect(err.response.data).toEqual('Payload "images" is required when request POST /images/process')
		}
	})

	it.skip('should response with server error', async () => {

		try {
			await axios.get('http://localhost:8080')
		} catch (err) {
			expect(err.response.status).toEqual(500)
			expect(err.response.headers['content-type']).toEqual('text/plain; charset=utf-8')
			expect(err.response.data).toEqual('')
		}
	})
})
