var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: './index.js',
    output: { path: path.join(__dirname, 'build'), filename: 'bundle.js' },
    module: {
        loaders: [
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react', 'stage-0', 'decorators-legacy'],
                    env: {
                        dev: {
                            presets: ['react-hmre']
                        }
                    }
                }
            }
        ]
    },
    devServer: {
        historyApiFallback: true,
        hot: true,
        progress: true,
        colors: true,
        stats: 'errors-only',
        host: 'localhost',
        port: 8080,
        open: true,
        outputPath: path.join(__dirname, 'build')
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
};