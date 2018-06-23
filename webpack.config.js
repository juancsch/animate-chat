const path = require('path')

module.exports = {
    entry: path.join(__dirname, 'client', 'app.js'),
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'js/app.bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /(node_modules)/,
                query: {
                    presets: ['es2015']
                }
			},
            {
                test: /\.hbs$/,
                loader: 'handlebars-loader'
            }
        ]
    }
}
