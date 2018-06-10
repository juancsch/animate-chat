const router = require('express').Router()

function fail (err, res) {
    res.status(500)
       .set('Content-Type', 'text/plain')
       .send(err.message)
}

function buildRoute (video) {

    router.post('/', (req, res) => {

        if (!Array.isArray(req.body.images)) {
            return fail({message: 'parameter `images` is required'}, res)
        }

        video.convert(req.body.images)
            .on('video', function (vd) {
                res.status(200)
                   .set('Content-Type', 'application/json')
                   .json({
                       video: vd
                   })
            })
            .on('error', function (err) {
                fail(err, res)
            })
            .on('log', function (log) {
                console.log(log)
            })
    })

    return router
}

module.exports = {

    new (video) {

        return buildRoute(video)
    }
}
