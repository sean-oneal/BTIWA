'use strict';

const express = require('express');
const path = require('path');
const app = express();

const dotenv = require('dotenv');
const watson = require('watson-developer-cloud');
//TODO body-parser

const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config');

const compiler = webpack(webpackConfig);

app.use(express.static(path.join(__dirname, '../client')));

//load environment properties from a .env file
dotenv.load({silent: true});

const ltAuthService = new watson.AuthorizationV1({
  username: process.env.TONE_ANALYZER_USERNAME,
  password: process.env.TONE_ANALYZER_PASSWORD,
  url: watson.ToneAnalyzerV3.WATSON_URL
});


app.get('/api/token/tone_analyzer', function(req, res) {
  ltAuthService.getToken(function(err, token) {
    if (err) {
      console.log('Error retrieving token:', err);
      return res.status(500).send('Error retrieving token');
    }
    res.send(token);
  });
});

app.get('/', function(req, res) {
  return res.sendFile(path.join(__dirname, '../client/src/index.html'));
});

const port = process.env.PORT || process.env.VCAP_APP_PORT || 8080;

app.listen(port, function() {
  console.log('👻 Watson Server is running at http://localhost:%s/', port);
});

// console.log('Server is listening on port 8090 👻');

// app.listen(8090);