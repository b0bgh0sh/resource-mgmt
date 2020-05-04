import React from 'react';
import AEicon from '../icons/associated-engineering-logo-png-transparent.png';
const Loading = () => {
  return (
    <div className="loading">
      <div>
        <img src={AEicon}></img>
        <div className="loading-bar"></div>
      </div>
    </div>
  );
};
export default Loading;
