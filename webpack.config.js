const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const APP_DIR = path.resolve(__dirname, 'client/src');
const BUILD_DIR = path.resolve(__dirname, 'client/dist');
const MODULES_DIR = path.resolve(__dirname, 'node_modules');


const HTMLWebpackConfigPlugin = new HtmlWebpackPlugin({
  template: APP_DIR + '/index.html',
  filename: 'index.html',
  inject: 'body'
});

const extractSass = new ExtractTextPlugin({
  filename: 'styles.css',
  disable: process.env.NODE_ENV === 'development',
});

const config = {
  devtool: 'source-map',
  entry: APP_DIR + '/index.js',
  output: {
    filename: 'bundle.js',
    path: BUILD_DIR,
    //publicPath: '/'
  },
  // node: {
  //   fs: 'empty',
  //   net: 'empty',
  //   tls: 'empty'
  // },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: APP_DIR,
        exclude: MODULES_DIR,
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader',
        include: APP_DIR,
        exclude: MODULES_DIR,
      },
      {
        test: /\.s?css$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      },
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  plugins: [ HTMLWebpackConfigPlugin, extractSass ]
};

module.exports = config;
