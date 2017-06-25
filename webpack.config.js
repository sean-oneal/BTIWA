const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const APP_DIR = path.resolve(__dirname, 'client/src');
const BUILD_DIR = path.resolve(__dirname, 'client/dist');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './client/src/index.html',
  filename: 'index.html',
  inject: 'body'
});
// const plugins = require('webpack-load-plugins')({
//   rename: {
//     'html-webpack-plugin': 'Html',
//   },
// });

// const standardPlugins = [
//   new plugins.Html({
//     title: 'Twit Vis',
//     template: `${APP_DIR}/index.html`,
//   })
// ];

const config = {
  entry: APP_DIR + '/components/app.jsx',
  output: {
    filename: 'bundle.js',
    path: BUILD_DIR
  },
  // node: {
  //   fs: 'empty',
  //   net: 'empty',
  //   tls: 'empty'
  // },
  // plugins: (process.env.NODE_ENV === 'production') ? [
  //   ...standardPlugins,
  //   new webpack.DefinePlugin({
  //     'process.env': {
  //       NODE_ENV: JSON.stringify('production'),
  //     },
  //   }),
  //   new webpack.optimize.UglifyJsPlugin({
  //     compress: { warnings: false },
  //   }),
  // ] : [
  //   ...standardPlugins,
  // ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: APP_DIR,
        exclude: /node_modules/,
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader',
        include: APP_DIR,
        exclude: /node_modules/,
      },
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  plugins: [HtmlWebpackPluginConfig]
};

module.exports = config;

//TODO Look up html loader => it also appends script to load bundle.js (remove from HTML)