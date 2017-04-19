import React from 'react';

const Tweet = (props) => {
  return (
    <div>
      <li>
        <div>
        {props.username}:
        </div>
        <p>{props.message}</p>
        <p>{props.time}</p>
      </li>
    </div>
  );
};

export default Tweet;