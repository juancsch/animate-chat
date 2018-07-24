const path = require('path')
const bodyParser = require('body-parser')

const express = require('express')

const STATUS_CODE = require('./http-status-code')

module.exports = (controllers) => {
	//
	const app = express()

    //
	app.use(bodyParser.json())
	app.use(express.static(path.join(__dirname, '..', '..', 'public')))

    //
	controllers.registerOn(app)

    //
	app.use((req, res, next) => {
		const err = new Error('Not Found')
		err.status = STATUS_CODE.HTTP_BAD_REQUEST
		next(err)
	})

    //
	app.use((err, req, res, next) => {
		res.status(err.status || STATUS_CODE.HTTP_SERVER_ERROR)
			.set('Content-Type', 'text/plain')
			.send(`${err.message}\n${req}`)
		next()
	})

    return app
}
