module.exports = {
    entry: './client/app.js',
    output: {
        path: './public',
        filename: 'js/app.bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.hbs$/,
                loader: 'handlebars-loader'
            }
        ]
    }
}
