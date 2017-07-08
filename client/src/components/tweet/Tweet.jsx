import React from 'react';
import './styles.scss';

const Tweet = ({ author, body, profileImg, screenName }) => {
  return (
  <div className="tweet">
      <div className="tweet-body"> {body}
        <div className="user-profile">
          <img className="user-image" alt={author} src={profileImg} />
          <p className="user-name"> {'@' + screenName} </p>
        </div>
      </div>
  </div>
  );
};

export default Tweet;