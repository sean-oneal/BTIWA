const Tweet = require('../models/tweet');

const streamHandler = (stream, io) => {

  stream.on('data', event => {

    const tweet = {
      tweetId: event.id,
      active: false,
      author: event.user.name,
      profileImg: event.user.profile_image_url_https,
      body: event.text,
      date: event.created_at,
      screenName: event.user.screen_name,
    };

    const tweetModel = new Tweet(tweet);

    tweetModel.save( err => {
      if (!err) {
        io.emit('tweet', tweet);
      }
    });
  });

  stream.on('error', error => {
    throw error;
  });
};

module.exports = streamHandler;