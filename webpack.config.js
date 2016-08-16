/**
 *
 */

module.exports = {
    entry: './client/app.js',
    output: {
        path: './public',
        filename: 'js/app.bundle.js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel',
            exclude: /(node_modules)/,
            query: {
                presets: ['es2015']
            }},
            {
                test: /\.hbs$/,
                loader: "handlebars-loader"
            }
        ]
    }
};
