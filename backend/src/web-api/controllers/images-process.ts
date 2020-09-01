import express, { Request, Response, NextFunction } from 'express'
import { HttpError } from '../HttpError'

export function ImagesProcessController () {

	const router = express.Router()

	router.post('/images/process', doPost)

	return router
}

function doPost (req: Request, res: Response, next: NextFunction) {

	if (!Array.isArray(req.body.images)) {
		throw new HttpError(400, 'Payload "images" is required')
	}

	const messageVideo = { video: '' } // generateVideoFrom(req.body.images)

	res.status(200)
		.set('Content-Type', 'application/json')
		.json(messageVideo)
}
