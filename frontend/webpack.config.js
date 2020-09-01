const path = require('path')

module.exports = {
	mode: 'production',
    entry: path.join(__dirname, 'src', 'app.js'),
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'js/app.bundle.js'
    },
    module: {
        rules: [
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
