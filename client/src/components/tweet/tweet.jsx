import React from 'react';
import './styles.scss';

const Tweet = (props) => {
  return (
  <div>
      <blockquote> {props.body}
        <div>
          <img alt={props.author} src={props.profileImg} />
          <span> {'@' + props.screenName} </span>
        </div>
      </blockquote>
  </div>
  );
};

export default Tweet;