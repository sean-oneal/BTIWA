/* eslint-disable*/
'use strict';

const dotenv = require('dotenv');
//load environment properties from a .env file
dotenv.load({silent: true});

//Twitter API
const Twitter = require('twitter');
//TWITTER API KEYS
const twitterClient = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  bearer_token: process.env.TWTR_BEARER_TOKEN,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});
const TWTR_BEARER_TOKEN = new Buffer(process.env.TWITTER_BEARER_TOKEN).toString('base64');

const port = process.env.PORT || 3000;

const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const path = require('path');
const socketIo = require('socket.io');

//webpack config
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackConfig = require('../webpack.config');

//Backend config
const db = require('./db');
const routes = require('./routes');
const streamHandler = require('../utils/streamHandler');

//Start Express server
const app = express();

// Disable etag headers on responses
app.disable('etag');

app.get('/api/tweets', routes.index);
app.use('/#top', routes.index);
app.get('/api/page/:page/:skip', routes.page);

// app.use(bodyParser.urlencoded({ extended: false }));
app.use(webpackDevMiddleware(webpack(webpackConfig)));

app.use(express.static(path.join(__dirname, '../dist')));

const server = http.createServer(app);

server .listen(port, () => {
  console.log('\n 👻  Server is running at ==> http://localhost:%s/', port);
});

let params = {track:'San Francisco', lang: 'en'};

const io = socketIo(server);

io.on('connection', socket => {
   socket.on('connection', () => {
      twitterClient.stream('statuses/filter', params, stream => {
        streamHandler(stream, socket);
      });
  });
  socket.on('updateTopic', data => {
    params.track = data.topic;
    twitterClient.stream('statuses/filter', params, stream => {
        streamHandler(stream, socket);
    });
  })
  socket.on('disconnect', () => {
    console.log('user disconnected');
  })
})


//Set a stream listener for tweets matching certain keywords
// twitterClient.stream('statuses/filter', { track: 'xbox' }, (stream) => {
//   streamHandler(stream, io);
// });

//IBM BLUEMATRIX API KEYS
// const watson = require('watson-developer-cloud');
// const ltAuthService = new watson.AuthorizationV1({
//   username: process.env.TONE_ANALYZER_USERNAME,
//   password: process.env.TONE_ANALYZER_PASSWORD,
//   url: watson.ToneAnalyzerV3.WATSON_URL
// });
// app.get('/api/token/tone_analyzer', (req, res) => {
//   ltAuthService.getToken( (err, token) => {
//     if (err) {
//       console.log('Error retrieving token:', err);
//       return res.status(500).send('Error retrieving token');
//     }
//     res.send(token);
//   });
// });
