/**
 *
 */

'use strict'

const http = require('http')
const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

module.exports = {

    start(routes, realtime, port = 8080) {

        const app = express()
        const server = http.createServer(app)

        realtime.initWith(server)

        app.use(bodyParser.json())

        app.use(express.static(path.join(__dirname, '..', 'public')))

        routes.registerOn(app)

        app.use((req, res, next) => {
            const err = new Error('Not Found')
            err.status = 404
            next(err)
        })

        app.use((err, req, res, next) => {
            res.status(err.status || 500)
               .set('Content-Type', 'text/plain')
               .send(`${err.message}\n${req}`)
            next()
        })

        server.listen(port, () => {
            console.log('Server started on port:', port)
        })
    }
}
