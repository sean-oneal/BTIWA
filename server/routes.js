// let tweetRouter = require('express').Router();
// const tweetController = require('./controllers');

let React = require('react');
let Tweet = require('.././models/tweet');


const routes = {
  index: (req, res) => {
    // Fetch tweets from the database
    Tweet.getTweets(0, 0, (tweets, pages) => {
      res.send(tweets);
    });
  },

  page: (req, res) => {
    Tweet.getTweets(req.params.page, req.params.skip, tweets => {
      res.send(tweets);
    });
  }
};

module.exports = routes;