import React from 'react';
import './styles.scss';

const NotificationBar = ( {count, onShowNewTweets } ) => {
  return (
  <div className={ 'notifcation-bar' + ( count > 0 ? ' active' : '' ) }>
        <p>{`There are ${count} new tweets!`}
          <a href="#top" onClick={onShowNewTweets}> Update Tweets</a>
        </p>
  </div>
  );
};

export default NotificationBar;
