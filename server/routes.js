// let tweetRouter = require('express').Router();
// const tweetController = require('./controllers');

let React = require('react');
let Tweet = require('.././models/tweet');


const routes = {
  index: (req, res) => {
    // Fetch tweets from the database
    Tweet.getTweets(0, 0, (tweets, pages) => {
      // console.log('fetching!', tweets, pages);
      res.send(tweets);
    });
  },

  page: (req, res) => {
    // Fetch certain page of tweets from the database
    Tweet.getTweets(req.params.page, req.params.skip, (tweets) => {
      res.send(tweets);
    });
  }
};

module.exports = routes;