import React from 'react';
import './styles.scss';

const NotificationBar = ( {count, onShowNewTweets } ) => (
  <div className={ 'notification-bar' + (count > 0 ? ' active' : ' hidden') }>
    <p>{`${count} New Tweets! `}
      <a href="/#top" onClick={onShowNewTweets}> Click To Update Tweets</a>
    </p>
  </div>
);


export default NotificationBar;
