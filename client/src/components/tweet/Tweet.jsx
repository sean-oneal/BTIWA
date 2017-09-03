import React from 'react';
import './styles.scss';

const Tweet = ({active, body, author, profileImg, screenName}) => (
  <li className={'tweet' + (active ? ' active' : ' hidden')}>
    <div className="tweet-row">
      <div className="tweet-col">
        <img className="image" alt={author} src={profileImg} />
      </div>
      <div className="tweet-col">
        <p id="user-author">{author}</p>
        <p id="user-screenName">{`@${screenName}`}</p>
      </div>

    </div>
    <div className="tweet-row">
      <p className="tweet-text">{body}</p>
    </div>
  </li>
);

export default Tweet;
