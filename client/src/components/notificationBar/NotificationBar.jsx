import React from 'react';
import './styles.scss';

const NotificationBar = ( {count, showNewTweets } ) => {
  return (
  <div className={ 'notification-bar' + ( count > 3 ? ' active' : '' ) }>
        <p>{`There are ${count} new tweets!`}
          <a href="#top" onClick={showNewTweets}> Update Tweets</a>
        </p>
  </div>
  );
};

export default NotificationBar;
