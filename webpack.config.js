var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: [
       
        './index.js'
    ],
    output: { 
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/static/' 
    },
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
        colors: true,
        stats: 'errors-only',
        host: 'localhost',
        port: 8080,
        open: true,
        outputPath: path.join(__dirname, 'static')
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
};