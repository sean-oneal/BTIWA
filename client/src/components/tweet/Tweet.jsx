import React from 'react';
import './styles.scss';

const Tweet = ({active, body, author, profileImg, screenName}) => (
  <li className={'tweet' + (active ? ' active' : ' hidden')}>
    <div className="tweet-user-info">
      <div className="user-image">
        <img className="image" alt={author} src={profileImg} />
      </div>
      <div className="user-name">
        <p id="user-author">{author}</p>
        <p id="user-screenName">{`@${screenName}`}</p>
      </div>
    </div>
    <div className="tweet-body">
      <p className="tweet-text">{body}</p>
    </div>
  </li>
);

export default Tweet;
