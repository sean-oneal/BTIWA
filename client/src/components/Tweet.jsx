import React from 'react';

const Tweet = (props) => {
  let style = {
    borderStyle: 'solid',
    color: 'grey',
  };
  return (
  <div>
      <blockquote style={style}> {props.body}
        <div>
          <img alt={props.author} src={props.profileImg} />
          <span> {'@' + props.screenName} </span>
        </div>
      </blockquote>
  </div>
  );
};

export default Tweet;