import React from 'react';
import Tweet from '../tweet/Tweet';
import './styles.scss';

const TweetStream = ( { tweetStream } ) => {
  return (
    <div className="tweet-stream-container">
        <ul className="tweet-stream">
        {tweetStream.map( (tweet, idx) => {
          return (
            <li key={idx} className="tweet-list-item">
            <Tweet screenName={tweet.screenName} author={tweet.author} body={tweet.body} profileImg={tweet.profileImg} key={tweet._id} />
            </li>
          );
        })}
        </ul>
    </div>
  );
};

export default TweetStream;