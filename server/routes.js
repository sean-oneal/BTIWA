const tweetRouter = require('express').Router();
var tweetController = require('./controllers');

//Create route handlers for each of the six methods in tweetController

//GET Request - retrieve ALL Tweets
tweetRouter.get('/api/tweets', tweetController.retrieveTweets);


module.exports = tweetRouter;

