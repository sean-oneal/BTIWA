import React from 'react';
import Tweet from './Tweet';

const StreamList = ( { tweetFeed } ) => {
  return (
    <div>
      <ul>
        {tweetFeed.tweets.map( tweet => {
          return (
            <Tweet username={tweet.username} message={tweet.message} time={tweet.time} key={tweet.id} />
          );
        })}
      </ul>
    </div>
  );
};

export default StreamList;