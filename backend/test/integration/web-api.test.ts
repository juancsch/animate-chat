import request from 'supertest'
import { Application } from "express";
import webApi from '../../src/web-api'

describe('Web API', function () {

	let app: Application

	beforeEach(() => {
		app = webApi.init()
	})

	describe('when request are valid', function () {

		it.skip('should response with index.html', () => {

			return request(app)
				.get('/')
				.expect('Content-Type', 'text/html; charset=utf-8')
				.expect(200, '')
		})
	})

	describe('when requests are invalid', function () {

		it('should not found request uri', () => {

			return request(app)
				.get('/no-exists')
				.expect('Content-Type', 'text/plain; charset=utf-8')
				.expect(404, 'Not Found route when request GET /no-exists')
		})

		it('should verify payload in post images', () => {

			return request(app)
				.post('/images/process')
				.expect('Content-Type', 'text/plain; charset=utf-8')
				.expect(400, 'Payload "images" is required when request POST /images/process')
		})

		it.skip('should response with server error', () => {

			return request(app)
				.post('/images/process')
				// .send({ images: [] })
				.expect('Content-Type', 'text/plain; charset=utf-8')
				.expect(500, '')
		})
	})
})
