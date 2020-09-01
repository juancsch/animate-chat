import path from 'path'
import bodyParser from 'body-parser'
import express, { NextFunction, Request, Response } from 'express'

import { ImagesProcessController } from './controllers/images-process'
import { HttpError } from './HttpError'

const HTTP_NOT_FOUND = 404
const HTTP_SERVER_ERROR = 500

export default {
	init () {
		const app = express()

		// static web server
		app.use(bodyParser.json())
		app.use(express.static(path.join(__dirname, '..', '..', '..', 'frontend', 'public')))

		// routes to controllers
		app.use(ImagesProcessController())

		// error management
		app.use(notFoundHandler)
		app.use(errorHandler)

		return app
	}
}

function notFoundHandler (req: Request, res: Response, next: NextFunction) {
	next(new HttpError(HTTP_NOT_FOUND, 'Not Found route'))
}

function errorHandler (err: HttpError, req: Request, res: Response, next: NextFunction) {
	res.status(err.status || HTTP_SERVER_ERROR)
		.set('Content-Type', 'text/plain')
		.end(`${err.message} when request ${req.method} ${req.url}`)
}
