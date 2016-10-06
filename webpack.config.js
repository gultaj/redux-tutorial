var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry: [
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      query: {
        "presets": ["es2015", "stage-0", "react"],
        "plugins": ["react-hot-loader/babel", "transform-decorators-legacy", "babel-plugin-transform-object-rest-spread"]
      },
      include: path.join(__dirname, 'src')
    }]
  },
  devServer: {
    stats: "minimum",
    open: true,
    historyApiFallback: true
  },
};