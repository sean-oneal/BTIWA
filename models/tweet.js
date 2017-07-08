const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tweetSchema = new Schema({
  tweetId: String,
  active: Boolean,
  author: String,
  profileImg: String,
  body: String,
  date: Date,
  screenName: String,
});

// const Tweet = mongoose.model('Tweet', tweetSchema);

tweetSchema.statics.getTweets = (page, skip, callback) => {
  let dbTweets = [];
  let start = (page * 10) + (skip * 1);

  // Query mongoose database => use skip & limit to achieve page chunks
  Tweet.find({}, 'tweetId active author profileImg body date screenName',
      { skip: start, limit: 10 })
    .sort({ date: 'desc' })
    .exec( (err, docs) => {
      if (!err) {
        dbTweets = docs;
        dbTweets.forEach( tweet => {
          tweet.active = true;
        });
      }

      callback(dbTweets);
    });
};
const Tweet = mongoose.model('Tweet', tweetSchema);

module.exports = Tweet;