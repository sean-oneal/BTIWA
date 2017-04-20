import React from 'react';
import Tweet from './Tweet';

const TweetStream = ( { tweetsStream } ) => {
  return (
    <div>
      <ul>
        {tweetsStream.tweets.map( tweet => {
          return (
            <Tweet username={tweet.username} message={tweet.message} time={tweet.time} key={tweet.id} />
          );
        })}
      </ul>
    </div>
  );
};

export default TweetStream;