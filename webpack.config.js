var webpack = require('webpack');
var path = require('path');

var APP_DIR = path.resolve(__dirname, 'client/src');
var BUILD_DIR = path.resolve(__dirname, 'client/dist');

var config = {
  entry: APP_DIR + '/index.jsx',
  output: {
    filename: 'bundle.js',
    path: BUILD_DIR
  },
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        loader: 'babel-loader',
        include: APP_DIR,
        exclude: /node_modules/,
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  }
};

module.exports = config;