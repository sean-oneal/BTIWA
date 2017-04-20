/* eslint-disable*/
'use strict';


const express = require('express');
const path = require('path');
const app = express();

const dotenv = require('dotenv');
const watson = require('watson-developer-cloud');
const Twitter = require('twitter');
const db = require('./db');
const streamHandler = require('.././utils/streamHandler');

const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config');

const compiler = webpack(webpackConfig);

app.use(express.static(path.join(__dirname, '../client/dist')));

//load environment properties from a .env file
dotenv.load({silent: true});

const port = process.env.PORT || 8080;

const server = app.listen(port, function() {
  console.log('👻  Server is running at ==> http://localhost:%s/', port);
});


const TWTR_BEARER_TOKEN = new Buffer(process.env.TWITTER_BEARER_TOKEN).toString('base64');

var io = require('socket.io').listen(server);

const twitterClient = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  bearer_token: process.env.TWTR_BEARER_TOKEN,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

//Set a stream listener for tweets matching certain keywords
twitterClient.stream('statuses/filter', { track: 'javascript' }, function(stream) {
  streamHandler(stream, io);
});
// const ltAuthService = new watson.AuthorizationV1({
//   username: process.env.TONE_ANALYZER_USERNAME,
//   password: process.env.TONE_ANALYZER_PASSWORD,
//   url: watson.ToneAnalyzerV3.WATSON_URL
// });
// app.get('/api/token/tone_analyzer', function(req, res) {
//   ltAuthService.getToken(function(err, token) {
//     if (err) {
//       console.log('Error retrieving token:', err);
//       return res.status(500).send('Error retrieving token');
//     }
//     res.send(token);
//   });
// });


app.get('/', function(req, res) {
  return res.sendFile(path.join(__dirname, '../client/src/index.html'));
});

