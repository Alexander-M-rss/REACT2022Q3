import React from 'react';
import './downloadIndicator.css';
import indicator from '../assets/img/infinity.gif';

function DownloadIndicator() {
  return (
    <div className="download-indicator">
      <img src={indicator} alt="Loading..." />
    </div>
  );
}

export default DownloadIndicator;
