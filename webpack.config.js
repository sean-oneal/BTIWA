var webpack = require('webpack');
var path = require('path');

var APP_DIR = path.resolve(__dirname, 'client/src');
var BUILD_DIR = path.resolve(__dirname, 'client/dist');

var config = {
  entry: APP_DIR + '/index.js',
  output: {
    filename: 'bundle.js',
    path: BUILD_DIR
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: APP_DIR,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  }
};

module.exports = config;