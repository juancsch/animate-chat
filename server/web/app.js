const path = require('path')
const bodyParser = require('body-parser')

const express = require('express')

const HTTP_SERVER_ERROR = 500

module.exports = (routes) => {
	//
	const app = express()

    //
	app.use(bodyParser.json())
	app.use(express.static(path.join(__dirname, '..', '..', 'public')))

    //
	routes.registerOn(app)

    //
	app.use((req, res, next) => {
		const err = new Error('Not Found')
		err.status = 404
		next(err)
	})

    //
	app.use((err, req, res, next) => {
		res.status(err.status || HTTP_SERVER_ERROR)
			.set('Content-Type', 'text/plain')
			.send(`${err.message}\n${req}`)
		next()
	})

    return app
}
