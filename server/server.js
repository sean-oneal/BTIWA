/* eslint-disable*/
'use strict';


const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const path = require('path');
const socketIo = require('socket.io');
const dotenv = require('dotenv');

//load environment properties from a .env file
dotenv.load({silent: true});

const Twitter = require('twitter');

//webpack config
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackConfig = require('../webpack.config');

//Backend config
const db = require('./db');
const routes = require('./routes');
const streamHandler = require('.././utils/streamHandler');
const port = process.env.PORT;
//Start Express server
const app = express();

app.use(express.static(path.join(__dirname, '../client')));

app.use(webpackDevMiddleware(webpack(webpackConfig)));
app.use(bodyParser.urlencoded({ extended: false }));

const server = http.createServer(app);
const io = socketIo(server);

server .listen(port, () => {
  console.log('\n 👻  Server is running at ==> http://localhost:%s/', port);
});

//TWITTER API KEYS
const TWTR_BEARER_TOKEN = new Buffer(process.env.TWITTER_BEARER_TOKEN).toString('base64');

const twitterClient = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  bearer_token: process.env.TWTR_BEARER_TOKEN,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

let params = {track:'Javascript', lang: 'en'};

io.on('connection', socket => {

   socket.on('connection', () =>{

      twitterClient.stream('statuses/filter', params, (stream) => {
        streamHandler(stream, socket);
      });
      stream.stop();
  });


  socket.on('updateTopic', data => {
    // console.log('UPDATING TOPIC', data);
    let params = {track: data.topic, lang: 'en'};

    twitterClient.stream('statuses/filter', params, (stream) => {
        console.log('UPDATING TOPIC', data);
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

// app.get('/tweets', routes.index);
// app.get('/page/:page/:skip', routes.page);


app.use('/', (req, res) => {
  return res.sendFile(path.join(__dirname, '../client/src/index.html'));
});

