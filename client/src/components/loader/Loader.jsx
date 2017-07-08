import React from 'react';
import './styles.scss';

const Loader = ( { paging } ) => {
  return (
      <div className={'loader' + ( paging ? '-active' : '' )}>

      </div>
  );
};

export default Loader;