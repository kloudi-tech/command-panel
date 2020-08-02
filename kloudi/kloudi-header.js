import React from 'react';

import logo from './images/logo.svg';

import './kloudi-header.css';

function header() {
  return (
    <div className={`wrapper`}>
      <object className='logo' type='image/svg+xml' data={logo} />
      <span className='item'>{`Command Panel`}</span>
    </div>
  );
}

export default header;
