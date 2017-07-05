import React from 'react';
import Tweet from '../tweet/Tweet';
import './styles.scss';

const TweetStream = ( props) => {
  return (
    <div>
        <ul className="tweet-stream">
        {props.tweetStream.map( tweet => {
          return (
            <li className="tweet-list-item">
            <Tweet screenName={tweet.screenName} author={tweet.author} body={tweet.body} profileImg={tweet.profileImg} key={tweet.tweetId} />
            </li>
          );
        })}
        </ul>
    </div>
  );
};

export default TweetStream;