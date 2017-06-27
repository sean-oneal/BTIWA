import React from 'react';
import Tweet from '../tweet/tweet';
import './styles.scss';

const TweetStream = ( props) => {
  return (
    <div>
        <ul className="stream">
        {props.tweetStream.map( tweet => {
          return (
            <ul>
            <Tweet screenName={tweet.screenName} author={tweet.author} body={tweet.body} profileImg={tweet.profileImg} key={tweet.tweetId} />
            </ul>
          );
        })}
        </ul>
    </div>
  );
};

export default TweetStream;