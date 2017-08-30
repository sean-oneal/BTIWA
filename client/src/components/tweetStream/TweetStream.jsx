import React from 'react';
import Tweet from '../tweet/Tweet';
import './styles.scss';

const TweetStream = ( { tweets } ) => {
  return (
    <div className="tweet-stream-container">
      <ul className="tweet-stream">
        {tweets.map((tweet, idx) =>
          (<Tweet
            active={tweet.active}
            author={tweet.author}
            body={tweet.body}
            key={idx}
            profileImg={tweet.profileImg}
            screenName={tweet.screenName}
          />)
        )}
      </ul>
    </div>
  );
};

export default TweetStream;