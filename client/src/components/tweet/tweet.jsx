import React from 'react';
import './styles.scss';

const Tweet = (props) => {
  return (
  <div className="tweet-content">
      <div className="tweet-body"> {props.body}
        <div className="user">
          <img className="user-image" alt={props.author} src={props.profileImg} />
          <span className="user-handle"> {'@' + props.screenName} </span>
        </div>
      </div>
  </div>
  );
};

export default Tweet;